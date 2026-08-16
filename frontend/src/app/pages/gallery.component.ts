import {
  Component,
  OnDestroy,
  OnInit
} from "@angular/core";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";

declare const pdfjsLib: any;

@Component({
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent
  implements OnInit, OnDestroy {
  images: any[] = [];
  categories: any[] = [];
  keyword = "";
  downloadMessage = "";
  private downloadMessageTimer: any;

  indiaDate = "";
  indiaTime = "";
  usaDate = "";
  usaTime = "";
  ukDate = "";
  ukTime = "";
  australiaDate = "";
  australiaTime = "";
  ksaDate = "";
  ksaTime = "";

  private clockInterval: any;
  private pdfScriptPromise: Promise<any> | null = null;
  private renderedPdfKeys: { [key: string]: boolean } = {};
  private renderingPdfKeys: { [key: string]: boolean } = {};
  private pdfObserver: IntersectionObserver | null = null;

  constructor(
    public api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit(): void {
    this.load();

    this.api.categories().subscribe(
      (response) => {
        this.categories = response || [];
      },
      (error) => {
        console.error("Unable to load categories", error);
        this.categories = [];
      }
    );

    this.updateDateAndTimes();
    this.clockInterval = setInterval(() => {
      this.updateDateAndTimes();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }

    if (this.pdfObserver) {
      this.pdfObserver.disconnect();
      this.pdfObserver = null;
    }

    if (this.downloadMessageTimer) {
      clearTimeout(this.downloadMessageTimer);
    }
  }

  updateDateAndTimes(): void {
    const now = new Date();
    const india = this.getDateAndTime(now, "Asia/Kolkata");
    const usa = this.getDateAndTime(now, "America/New_York");
    const uk = this.getDateAndTime(now, "Europe/London");
    const australia = this.getDateAndTime(now, "Australia/Sydney");
    const ksa = this.getDateAndTime(now, "Asia/Riyadh");

    this.indiaDate = india.date;
    this.indiaTime = india.time;
    this.usaDate = usa.date;
    this.usaTime = usa.time;
    this.ukDate = uk.date;
    this.ukTime = uk.time;
    this.australiaDate = australia.date;
    this.australiaTime = australia.time;
    this.ksaDate = ksa.date;
    this.ksaTime = ksa.time;
  }

  private getDateAndTime(
    currentDate: Date,
    timeZone: string
  ): { date: string; time: string } {
    return {
      date: currentDate.toLocaleDateString("en-GB", {
        timeZone,
        day: "2-digit",
        month: "2-digit",
        year: "numeric"
      }),
      time: currentDate.toLocaleTimeString("en-US", {
        timeZone,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true
      })
    };
  }

  load(): void {
    this.keyword = "";
    this.resetPdfRendering();

    this.api.images().subscribe(
      (response) => {
        this.images = response || [];
        this.schedulePdfPreviewObservation();
      },
      (error) => {
        console.error("Unable to load images", error);
        this.images = [];
      }
    );
  }

  search(): void {
    const normalizedKeyword = this.keyword ? this.keyword.trim() : "";
    if (!normalizedKeyword) {
      this.load();
      return;
    }

    this.resetPdfRendering();
    this.api.search(normalizedKeyword).subscribe(
      (response) => {
        this.images = response || [];
        this.schedulePdfPreviewObservation();
      },
      (error) => {
        console.error("Unable to search images", error);
        this.images = [];
      }
    );
  }

  cat(id: number): void {
    if (!id) {
      return;
    }

    this.resetPdfRendering();
    this.api.byCategory(id).subscribe(
      (response) => {
        this.images = response || [];
        this.schedulePdfPreviewObservation();
      },
      (error) => {
        console.error("Unable to load category images", error);
        this.images = [];
      }
    );
  }

  add(id: number): void {
    if (!id) {
      return;
    }

    this.api.addCart(id).subscribe(
      () => alert("Added to cart"),
      (error) => {
        console.error("Unable to add image to cart", error);
        alert("Unable to add item to cart");
      }
    );
  }

  isPdf(fileUrl: string): boolean {
    return !!fileUrl && fileUrl.toLowerCase().split("?")[0].endsWith(".pdf");
  }

  getPdfKey(img: any): string {
    if (!img) {
      return "";
    }
    return String(img.id || img.imageCode || img.imageUrl || "");
  }

  trackByImage(index: number, img: any): any {
    return img && (img.id || img.imageCode || img.imageUrl)
      ? img.id || img.imageCode || img.imageUrl
      : index;
  }

  onImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    const fallback = "assets/images/global-digipic-logo-4x6cm.jpeg";

    if (element && element.src.indexOf("global-digipic-logo-4x6cm.jpeg") === -1) {
      element.src = fallback;
    }
  }

  viewImage(code: string): void {
    if (!code) {
      return;
    }
    window.location.href = "/image-preview/" + encodeURIComponent(code);
  }

  downloadFile(img: any): void {
    if (!img) {
      return;
    }

    const originalUrl = this.api.originalFileDownloadUrl(img);
    const fallbackUrl = img.imageUrl ? this.api.imageUrl(img.imageUrl) : "";

    if (!originalUrl && !fallbackUrl) {
      this.showDownloadMessage("Unable to download file. Original file URL is missing.");
      return;
    }

    this.fetchOriginalFile(originalUrl || fallbackUrl)
      .catch((error) => {
        // Compatibility fallback for an older backend that does not yet expose
        // GET /api/images/{id}/download. This preserves the currently served file,
        // but true original format/size requires the backend original-download endpoint.
        if (fallbackUrl && fallbackUrl !== originalUrl) {
          return this.fetchOriginalFile(fallbackUrl);
        }
        throw error;
      })
      .then(({ blob, response, sourceUrl }) => {
        const fileName =
          this.fileNameFromContentDisposition(response.headers.get("Content-Disposition")) ||
          this.fileNameFromImageMetadata(img) ||
          this.fileNameFromUrl(sourceUrl) ||
          this.fileNameFromMimeType(blob.type, img);

        const objectUrl = window.URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = fileName;
        anchor.style.display = "none";

        document.body.appendChild(anchor);
        anchor.click();
        document.body.removeChild(anchor);

        setTimeout(() => window.URL.revokeObjectURL(objectUrl), 1000);
        this.showDownloadMessage("Original file downloaded. Check Downloads.");
      })
      .catch((error) => {
        console.error("Unable to download original file", error);
        this.showDownloadMessage("Unable to download original file. Please try again.");
      });
  }

  private fetchOriginalFile(url: string): Promise<{
    blob: Blob;
    response: Response;
    sourceUrl: string;
  }> {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error("Download failed: HTTP " + response.status);
      }

      return response.blob().then((blob) => ({
        blob,
        response,
        sourceUrl: url
      }));
    });
  }

  private fileNameFromContentDisposition(header: string | null): string {
    if (!header) {
      return "";
    }

    const utf8Match = header.match(/filename\*=UTF-8''([^;]+)/i);
    if (utf8Match && utf8Match[1]) {
      try {
        return decodeURIComponent(utf8Match[1].replace(/["']/g, ""));
      } catch (_) {
        return utf8Match[1].replace(/["']/g, "");
      }
    }

    const normalMatch = header.match(/filename="?([^";]+)"?/i);
    return normalMatch && normalMatch[1] ? normalMatch[1].trim() : "";
  }

  private fileNameFromImageMetadata(img: any): string {
    const value =
      img.originalFileName ||
      img.originalFilename ||
      img.fileName ||
      img.filename ||
      "";

    return value ? String(value) : "";
  }

  private fileNameFromUrl(url: string): string {
    if (!url) {
      return "";
    }

    try {
      const clean = url.split("?")[0].split("#")[0];
      const value = clean.substring(clean.lastIndexOf("/") + 1);
      return value ? decodeURIComponent(value) : "";
    } catch (_) {
      return "";
    }
  }

  private fileNameFromMimeType(mimeType: string, img: any): string {
    const mimeExtensionMap: { [key: string]: string } = {
      "image/jpeg": ".jpg",
      "image/png": ".png",
      "image/webp": ".webp",
      "image/gif": ".gif",
      "image/bmp": ".bmp",
      "image/tiff": ".tif",
      "image/svg+xml": ".svg",
      "application/pdf": ".pdf"
    };

    const extension = mimeExtensionMap[mimeType] || "";
    const base = String(img.imageCode || img.name || "original-file")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "") || "original-file";

    return base + extension;
  }

  private showDownloadMessage(message: string): void {
    this.downloadMessage = message;
    if (this.downloadMessageTimer) {
      clearTimeout(this.downloadMessageTimer);
    }
    this.downloadMessageTimer = setTimeout(() => {
      this.downloadMessage = "";
    }, 3500);
  }

  private resetPdfRendering(): void {
    this.renderedPdfKeys = {};
    this.renderingPdfKeys = {};

    if (this.pdfObserver) {
      this.pdfObserver.disconnect();
      this.pdfObserver = null;
    }
  }

  private schedulePdfPreviewObservation(): void {
    setTimeout(() => {
      this.observePdfPreviews();
    }, 0);
  }

  private observePdfPreviews(): void {
    const nodes = Array.prototype.slice.call(
      document.querySelectorAll(".pdf-canvas-preview")
    ) as HTMLElement[];

    if (!nodes.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      nodes.forEach((node) => this.renderPdfElement(node));
      return;
    }

    if (!this.pdfObserver) {
      this.pdfObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) {
              return;
            }

            const element = entry.target as HTMLElement;
            this.renderPdfElement(element);

            if (this.pdfObserver) {
              this.pdfObserver.unobserve(element);
            }
          });
        },
        {
          root: null,
          rootMargin: "250px 0px",
          threshold: 0.01
        }
      );
    }

    nodes.forEach((node) => {
      const key = node.getAttribute("data-pdf-key") || "";
      if (!key || this.renderedPdfKeys[key] || this.renderingPdfKeys[key]) {
        return;
      }
      this.pdfObserver!.observe(node);
    });
  }

  private loadPdfJs(): Promise<any> {
    if ((window as any).pdfjsLib) {
      const lib = (window as any).pdfjsLib;
      lib.GlobalWorkerOptions.workerSrc = "assets/pdfjs/pdf.worker.min.js";
      return Promise.resolve(lib);
    }

    if (this.pdfScriptPromise) {
      return this.pdfScriptPromise;
    }

    this.pdfScriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "assets/pdfjs/pdf.min.js";
      script.async = true;
      script.onload = () => {
        const lib = (window as any).pdfjsLib;
        if (!lib) {
          reject(new Error("PDF.js did not initialize"));
          return;
        }
        lib.GlobalWorkerOptions.workerSrc = "assets/pdfjs/pdf.worker.min.js";
        resolve(lib);
      };
      script.onerror = () => reject(new Error("Unable to load local PDF.js"));
      document.head.appendChild(script);
    });

    return this.pdfScriptPromise;
  }

  private async renderPdfElement(element: HTMLElement): Promise<void> {
    const key = element.getAttribute("data-pdf-key") || "";
    const url = element.getAttribute("data-pdf-url") || "";

    if (!key || !url || this.renderedPdfKeys[key] || this.renderingPdfKeys[key]) {
      return;
    }

    this.renderingPdfKeys[key] = true;

    try {
      const lib = await this.loadPdfJs();
      const loadingTask = lib.getDocument({ url: url });
      const pdf = await loadingTask.promise;

      element.innerHTML = "";
      const availableWidth = Math.max(element.clientWidth - 4, 120);

      // Gallery cards only need a thumbnail. Rendering every page of every
      // PDF makes the production gallery unnecessarily slow.
      const page = await pdf.getPage(1);
      const baseViewport = page.getViewport({ scale: 1 });
      const scale = availableWidth / baseViewport.width;
      const viewport = page.getViewport({ scale: scale });

      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d", { alpha: false }) as CanvasRenderingContext2D;
      const outputScale = Math.min(window.devicePixelRatio || 1, 1.5);

      canvas.width = Math.floor(viewport.width * outputScale);
      canvas.height = Math.floor(viewport.height * outputScale);
      canvas.style.width = Math.floor(viewport.width) + "px";
      canvas.style.height = Math.floor(viewport.height) + "px";
      canvas.className = "pdf-page-canvas";

      context.save();
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.restore();

      element.appendChild(canvas);

      await page.render({
        canvasContext: context,
        viewport: viewport,
        transform: outputScale !== 1
          ? [outputScale, 0, 0, outputScale, 0, 0]
          : null,
        background: "rgb(255,255,255)"
      }).promise;

      this.renderedPdfKeys[key] = true;
    } catch (error) {
      console.error("Unable to render PDF preview", url, error);
      element.innerHTML = '<div class="pdf-error">PDF preview unavailable</div>';
    } finally {
      delete this.renderingPdfKeys[key];
    }
  }
}
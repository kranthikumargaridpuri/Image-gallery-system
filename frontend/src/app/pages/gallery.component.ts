import {
  AfterViewChecked,
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
  implements OnInit, OnDestroy, AfterViewChecked {
  images: any[] = [];
  categories: any[] = [];
  keyword = "";

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

  ngAfterViewChecked(): void {
    this.observePdfPreviews();
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
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

  private resetPdfRendering(): void {
    this.renderedPdfKeys = {};
    this.renderingPdfKeys = {};
  }

  private observePdfPreviews(): void {
    const nodes = Array.prototype.slice.call(
      document.querySelectorAll(".pdf-canvas-preview")
    ) as HTMLElement[];

    // Render every PDF automatically as soon as its card exists.
    // No IntersectionObserver, no lazy PDF loading, no click/button.
    nodes.forEach((node) => {
      const key = node.getAttribute("data-pdf-key") || "";
      if (!this.renderedPdfKeys[key] && !this.renderingPdfKeys[key]) {
        this.renderPdfElement(node);
      }
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

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
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
      }

      this.renderedPdfKeys[key] = true;
    } catch (error) {
      console.error("Unable to render PDF preview", url, error);
      element.innerHTML = '<div class="pdf-error">PDF preview unavailable</div>';
    } finally {
      delete this.renderingPdfKeys[key];
    }
  }
}

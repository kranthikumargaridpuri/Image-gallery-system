import { AfterViewChecked, Component, OnDestroy, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit, OnDestroy, AfterViewChecked {
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
  private pdfObserver: IntersectionObserver | null = null;
  private observedPdfKeys: { [key: string]: boolean } = {};
  private renderedPdfKeys: { [key: string]: boolean } = {};
  private renderingPdfKeys: { [key: string]: boolean } = {};
  private pdfJsPromise: Promise<any> | null = null;

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
    this.setupPdfAutoPreview();
  }

  ngOnDestroy(): void {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }

    if (this.pdfObserver) {
      this.pdfObserver.disconnect();
      this.pdfObserver = null;
    }
  }

  updateDateAndTimes(): void {
    const now = new Date();

    const india = this.getDateAndTime(now, "Asia/Kolkata");
    this.indiaDate = india.date;
    this.indiaTime = india.time;

    const usa = this.getDateAndTime(now, "America/New_York");
    this.usaDate = usa.date;
    this.usaTime = usa.time;

    const uk = this.getDateAndTime(now, "Europe/London");
    this.ukDate = uk.date;
    this.ukTime = uk.time;

    const australia = this.getDateAndTime(now, "Australia/Sydney");
    this.australiaDate = australia.date;
    this.australiaTime = australia.time;

    const ksa = this.getDateAndTime(now, "Asia/Riyadh");
    this.ksaDate = ksa.date;
    this.ksaTime = ksa.time;
  }

  private getDateAndTime(
    currentDate: Date,
    timeZone: string
  ): { date: string; time: string } {
    const date = currentDate.toLocaleDateString("en-GB", {
      timeZone,
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });

    const time = currentDate.toLocaleTimeString("en-US", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true
    });

    return {
      date,
      time
    };
  }

  load(): void {
    this.keyword = "";

    this.api.images().subscribe(
      (response) => {
        this.images = response || [];
        this.resetPdfPreviewTracking();
      },
      (error) => {
        console.error("Unable to load images", error);
        this.images = [];
      }
    );
  }

  search(): void {
    const normalizedKeyword = this.keyword
      ? this.keyword.trim()
      : "";

    if (!normalizedKeyword) {
      this.load();
      return;
    }

    this.api.search(normalizedKeyword).subscribe(
      (response) => {
        this.images = response || [];
        this.resetPdfPreviewTracking();
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

    this.api.byCategory(id).subscribe(
      (response) => {
        this.images = response || [];
        this.resetPdfPreviewTracking();
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
      () => {
        alert("Added to cart");
      },
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

  private resetPdfPreviewTracking(): void {
    if (this.pdfObserver) {
      this.pdfObserver.disconnect();
      this.pdfObserver = null;
    }

    this.observedPdfKeys = {};
    this.renderedPdfKeys = {};
    this.renderingPdfKeys = {};
  }

  private setupPdfAutoPreview(): void {
    const elements = Array.prototype.slice.call(
      document.querySelectorAll(".pdf-js-preview[data-pdf-key]")
    ) as HTMLElement[];

    if (!elements.length) {
      return;
    }

    if (!("IntersectionObserver" in window)) {
      elements.forEach((element) => this.renderPdfElement(element));
      return;
    }

    if (!this.pdfObserver) {
      this.pdfObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const element = entry.target as HTMLElement;
              this.renderPdfElement(element);

              if (this.pdfObserver) {
                this.pdfObserver.unobserve(element);
              }
            }
          });
        },
        {
          root: null,
          rootMargin: "700px 0px",
          threshold: 0.01
        }
      );
    }

    elements.forEach((element) => {
      const key = element.getAttribute("data-pdf-key") || "";

      if (!key || this.observedPdfKeys[key] || this.renderedPdfKeys[key]) {
        return;
      }

      this.observedPdfKeys[key] = true;
      this.pdfObserver!.observe(element);
    });
  }

  private loadPdfJs(): Promise<any> {
    const globalWindow = window as any;

    if (globalWindow.pdfjsLib) {
      return Promise.resolve(globalWindow.pdfjsLib);
    }

    if (this.pdfJsPromise) {
      return this.pdfJsPromise;
    }

    this.pdfJsPromise = new Promise((resolve, reject) => {
      // Native dynamic import is deliberately created at runtime so the old
      // Angular 8/Webpack build does not try to bundle the modern .mjs file.
      const dynamicImport = new Function("url", "return import(url);") as any;

      dynamicImport(
        "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.min.mjs"
      )
        .then((pdfjsLib: any) => {
          pdfjsLib.GlobalWorkerOptions.workerSrc =
            "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.2.67/pdf.worker.min.mjs";

          globalWindow.pdfjsLib = pdfjsLib;
          resolve(pdfjsLib);
        })
        .catch(reject);
    });

    return this.pdfJsPromise;
  }

  private async renderPdfElement(element: HTMLElement): Promise<void> {
    const key = element.getAttribute("data-pdf-key") || "";
    const pdfUrl = element.getAttribute("data-pdf-url") || "";

    if (
      !key ||
      !pdfUrl ||
      this.renderedPdfKeys[key] ||
      this.renderingPdfKeys[key]
    ) {
      return;
    }

    this.renderingPdfKeys[key] = true;

    try {
      const pdfjsLib = await this.loadPdfJs();
      const loadingTask = pdfjsLib.getDocument({
        url: pdfUrl,
        isEvalSupported: false
      });
      const pdf = await loadingTask.promise;

      element.innerHTML = "";

      const availableWidth = Math.max(element.clientWidth, 120);

      for (let pageNumber = 1; pageNumber <= pdf.numPages; pageNumber++) {
        const page = await pdf.getPage(pageNumber);
        const initialViewport = page.getViewport({ scale: 1 });
        const scale = availableWidth / initialViewport.width;
        const viewport = page.getViewport({ scale });

        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d", { alpha: false });

        if (!context) {
          continue;
        }

        const deviceScale = Math.min(window.devicePixelRatio || 1, 1.5);

        canvas.width = Math.floor(viewport.width * deviceScale);
        canvas.height = Math.floor(viewport.height * deviceScale);
        canvas.style.width = Math.floor(viewport.width) + "px";
        canvas.style.height = Math.floor(viewport.height) + "px";
        canvas.setAttribute("aria-label", "PDF page " + pageNumber);

        context.save();
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);
        context.restore();

        element.appendChild(canvas);

        await page.render({
          canvasContext: context,
          viewport,
          transform:
            deviceScale === 1
              ? null
              : [deviceScale, 0, 0, deviceScale, 0, 0],
          background: "rgb(255,255,255)"
        }).promise;

        page.cleanup();
      }

      this.renderedPdfKeys[key] = true;
    } catch (error) {
      console.error("Unable to render PDF preview", error);
      element.innerHTML =
        '<div class="pdf-error">Unable to display PDF preview</div>';
    } finally {
      delete this.renderingPdfKeys[key];
    }
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

    window.location.href =
      "/image-preview/" + encodeURIComponent(code);
  }
}
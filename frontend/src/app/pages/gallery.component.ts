import { Component, OnDestroy, OnInit } from "@angular/core";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: "./gallery.component.html",
  styleUrls: ["./gallery.component.css"]
})
export class GalleryComponent implements OnInit, OnDestroy {
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

  private pdfPreviewCache: { [url: string]: SafeResourceUrl } = {};

  constructor(
    public api: ApiService,
    public auth: AuthService,
    private sanitizer: DomSanitizer
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


  isPdf(path: string): boolean {
    if (!path) {
      return false;
    }

    const cleanPath = path.split("?")[0].split("#")[0].toLowerCase();
    return cleanPath.endsWith(".pdf");
  }

  pdfPreviewUrl(path: string): SafeResourceUrl {
    if (!path) {
      return this.sanitizer.bypassSecurityTrustResourceUrl("about:blank");
    }

    const absoluteUrl = this.api.imageUrl(path);
    const previewUrl =
      absoluteUrl +
      "#page=1&zoom=page-fit&toolbar=0&navpanes=0&scrollbar=0";

    if (!this.pdfPreviewCache[previewUrl]) {
      this.pdfPreviewCache[previewUrl] =
        this.sanitizer.bypassSecurityTrustResourceUrl(previewUrl);
    }

    return this.pdfPreviewCache[previewUrl];
  }

  viewImage(code: string): void {
    if (!code) {
      return;
    }

    window.location.href =
      "/image-preview/" + encodeURIComponent(code);
  }
}
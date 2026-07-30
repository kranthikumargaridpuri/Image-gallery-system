import { Component, OnDestroy, OnInit } from "@angular/core";
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

  viewImage(code: string): void {
    if (!code) {
      return;
    }

    window.location.href =
      "/image-preview/" + encodeURIComponent(code);
  }
}
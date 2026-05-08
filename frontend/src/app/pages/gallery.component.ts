import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";

@Component({
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  categories: any[] = [];
  keyword = "";

  indiaTime = "";
  usaTime = "";
  ukTime = "";
  australiaTime = "";
  ksaTime = "";

  constructor(
    public api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    this.load();

    this.api.categories().subscribe((r) => {
      this.categories = r || [];
    });

    this.updateTimes();
    setInterval(() => this.updateTimes(), 1000);
  }

  updateTimes() {
    this.indiaTime = new Date().toLocaleTimeString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    this.usaTime = new Date().toLocaleTimeString("en-US", {
      timeZone: "America/New_York",
    });

    this.ukTime = new Date().toLocaleTimeString("en-GB", {
      timeZone: "Europe/London",
    });

    this.australiaTime = new Date().toLocaleTimeString("en-AU", {
      timeZone: "Australia/Sydney",
    });

    this.ksaTime = new Date().toLocaleTimeString("en-SA", {
      timeZone: "Asia/Riyadh",
    });
  }

  load() {
    this.api.images().subscribe((r) => {
      this.images = r || [];
    });
  }

  search() {
    this.api.search(this.keyword).subscribe((r) => {
      this.images = r || [];
    });
  }

  cat(id: number) {
    this.api.byCategory(id).subscribe((r) => {
      this.images = r || [];
    });
  }

  add(id: number) {
    this.api.addCart(id).subscribe(() => alert("Added to cart"));
  }
  
  viewImage(code: string) {
  window.location.href = "/image-preview/" + code;
}
}
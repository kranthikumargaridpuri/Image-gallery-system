import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { AuthService } from "../services/auth.service";
@Component({
  template: `<div class="hero mb-4">
      <h1>AsprineMinds </h1>
      <p>Category-wise image gallery with cart and admin upload.</p>
      <div class="input-group">
        <input
          class="form-control"
          placeholder="Search images"
          [(ngModel)]="keyword"
        />
        <div class="input-group-append">
          <button class="btn btn-light" (click)="search()">Search</button>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <button class="btn btn-outline-primary mr-2" (click)="load()">All</button
      ><button
        class="btn btn-outline-secondary mr-2"
        *ngFor="let c of categories"
        (click)="cat(c.id)"
      >
        {{ c.name }}
      </button>
    </div>
    <div class="row">
      <div class="col-md-4 mb-4" *ngFor="let img of images">
        <div class="card p-3">
          <img class="gallery-img" [src]="api.imageUrl(img.imageUrl)" />
          <h5 class="mt-3">{{ img.name }}</h5>
          <p>{{ img.description }}</p>
          <span class="badge badge-info">{{ img.categoryName }}</span
          ><button
            class="btn btn-primary mt-3"
            *ngIf="auth.loggedIn()"
            (click)="add(img.id)"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>`,
})
export class GalleryComponent implements OnInit {
  images: any[] = [];
  categories: any[] = [];
  keyword = "";
  constructor(
    public api: ApiService,
    public auth: AuthService,
  ) {}
  ngOnInit() {
    this.load();
    this.api.categories().subscribe((r) => (this.categories = r));
  }
  load() {
    this.api.images().subscribe((r) => (this.images = r));
  }
  search() {
    this.api.search(this.keyword).subscribe((r) => (this.images = r));
  }
  cat(id: number) {
    this.api.byCategory(id).subscribe((r) => (this.images = r));
  }
  add(id: number) {
    this.api.addCart(id).subscribe(() => alert("Added to cart"));
  }
}

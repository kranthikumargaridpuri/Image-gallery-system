import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
@Component({
  template: `<div class="admin-box">
      <h3>Admin Dashboard</h3>
      <div class="row">
        <div class="col-md-4">
          <h5>Add Category</h5>
          <input
            class="form-control my-2"
            placeholder="Category"
            [(ngModel)]="catName"
          /><textarea
            class="form-control my-2"
            placeholder="Description"
            [(ngModel)]="catDesc"
          ></textarea
          ><button class="btn btn-success" (click)="addCat()">
            Save Category
          </button>
        </div>
        <div class="col-md-8">
          <h5>Upload Image</h5>
          <input
            class="form-control my-2"
            placeholder="Image name"
            [(ngModel)]="name"
          /><textarea
            class="form-control my-2"
            placeholder="Description"
            [(ngModel)]="desc"
          ></textarea
          ><select class="form-control my-2" [(ngModel)]="categoryId">
            <option *ngFor="let c of categories" [value]="c.id">
              {{ c.name }}
            </option></select
          ><input
            class="form-control my-2"
            type="file"
            (change)="file($event)"
          /><button class="btn btn-primary" (click)="upload()">Upload</button>
        </div>
      </div>
    </div>
    <h4 class="mt-4">Manage Images</h4>
    <table class="table bg-white">
      <tr>
        <th>Image</th>
        <th>Name</th>
        <th>Category</th>
        <th>Action</th>
      </tr>
      <tr *ngFor="let i of images">
        <td><img [src]="api.imageUrl(i.imageUrl)" width="80" /></td>
        <td>{{ i.name }}</td>
        <td>{{ i.categoryName }}</td>
        <td>
          <button class="btn btn-sm btn-danger" (click)="del(i.id)">
            Delete
          </button>
        </td>
      </tr>
    </table>`,
})
export class AdminComponent implements OnInit {
  categories: any[] = [];
  images: any[] = [];
  catName = "";
  catDesc = "";
  name = "";
  desc = "";
  categoryId = "";
  selected: any;
  constructor(public api: ApiService) {}
  ngOnInit() {
    this.reload();
  }
  reload() {
    this.api.categories().subscribe((r) => (this.categories = r));
    this.api.images().subscribe((r) => (this.images = r));
  }
  addCat() {
    this.api
      .addCategory({ name: this.catName, description: this.catDesc })
      .subscribe(() => {
        this.catName = "";
        this.catDesc = "";
        this.reload();
      });
  }
  file(e) {
    this.selected = e.target.files[0];
  }
  upload() {
    const fd = new FormData();
    fd.append("name", this.name);
    fd.append("description", this.desc);
    fd.append("categoryId", this.categoryId);
    fd.append("file", this.selected);
    this.api.upload(fd).subscribe(() => {
      this.name = "";
      this.desc = "";
      this.reload();
    });
  }
  del(id:number) {
    this.api.deleteImage(id).subscribe(() => this.reload());
  }
}

import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  categories: any[] = [];
  images: any[] = [];

  catName = "";
  catDesc = "";

  name = "";
  desc = "";
  successMessage = "";

  cost = "";
  categoryId = "";
  nameError = "";
  descError = "";
  categoryError = "";
  fileError = "";
  costError = "";

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

  file(e: any) {
    this.selected = e.target.files[0];
  }

  upload() {
    this.nameError = "";
    this.descError = "";
    this.categoryError = "";
    this.fileError = "";
    this.costError = "";
    this.successMessage = "";

    let valid = true;

    if (!this.name || this.name.trim() === "") {
      this.nameError = "Image name is required";
      valid = false;
    }

    if (!this.desc || this.desc.trim() === "") {
      this.descError = "Description is required";
      valid = false;
    }

    if (!this.categoryId) {
      this.categoryError = "Please select category";
      valid = false;
    }

    if (!this.selected) {
      this.fileError = "Please select image";
      valid = false;
    }

    if (this.cost !== "" && Number(this.cost) < 0) {
  this.costError = "Image cost cannot be negative";
  valid = false;
      }

    if (!valid) {
      return;
    }

    const fd = new FormData();

    fd.append("name", this.name);
    fd.append("description", this.desc);
    fd.append("categoryId", this.categoryId);
    fd.append("cost", this.cost);
    fd.append("file", this.selected);

    this.api.upload(fd).subscribe(
      () => {
        this.successMessage = "Image uploaded successfully";

        this.name = "";
        this.desc = "";
        this.cost = "";
        this.categoryId = "";
        this.selected = null;

        this.reload();
      },
      err => {
        alert(err.error.message);
      }
    );
  }

  del(id: number) {
    this.api.deleteImage(id).subscribe(() => this.reload());
  }
}
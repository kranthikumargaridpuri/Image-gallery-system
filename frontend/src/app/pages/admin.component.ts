import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';

@Component({
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent implements OnInit {
  categories: any[] = [];
  images: any[] = [];

  catName = '';
  catDesc = '';

  name = '';
  desc = '';
  cost = '';
  categoryId = '';

  nameError = '';
  descError = '';
  categoryError = '';
  fileError = '';
  costError = '';
  successMessage = '';

  selected: any;

  showDeleteBox = false;
  selectedCategoryId: number = 0;

  private safePdfUrls: { [key: string]: SafeResourceUrl } = {};

  constructor(
    public api: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.reload();
  }

  reload() {
    this.api.categories().subscribe((r) => (this.categories = r || []));
    this.api.images().subscribe((r) => {
      this.images = r || [];
      this.safePdfUrls = {};
    });
  }

  addCat() {
    this.categoryError = '';

    if (!this.catName || this.catName.trim() === '') {
      this.categoryError = 'Category name is required';
      return;
    }

    this.api
      .addCategory({ name: this.catName, description: this.catDesc })
      .subscribe(() => {
        this.catName = '';
        this.catDesc = '';
        this.reload();
      });
  }

  file(e: any) {
    this.selected = e.target.files && e.target.files.length
      ? e.target.files[0]
      : null;
    this.fileError = '';
  }

  upload() {
    this.nameError = '';
    this.descError = '';
    this.categoryError = '';
    this.fileError = '';
    this.costError = '';
    this.successMessage = '';

    let valid = true;

    if (!this.name || this.name.trim() === '') {
      this.nameError = 'Image name is required';
      valid = false;
    }

    if (!this.desc || this.desc.trim() === '') {
      this.descError = 'Description is required';
      valid = false;
    }

    if (!this.categoryId) {
      this.categoryError = 'Please select category';
      valid = false;
    }

    if (!this.selected) {
      this.fileError = 'Please select image or PDF';
      valid = false;
    }

    if (this.cost !== '' && Number(this.cost) < 0) {
      this.costError = 'Image cost cannot be negative';
      valid = false;
    }

    if (!valid) {
      return;
    }

    const fd = new FormData();
    fd.append('name', this.name.trim());
    fd.append('description', this.desc.trim());
    fd.append('categoryId', this.categoryId);
    fd.append('cost', this.cost);
    fd.append('file', this.selected);

    this.api.upload(fd).subscribe(
      () => {
        this.successMessage = 'Image uploaded successfully';
        this.name = '';
        this.desc = '';
        this.cost = '';
        this.categoryId = '';
        this.selected = null;
        this.reload();
      },
      (err) => {
        // 401 is handled centrally by AuthInterceptor and redirects to Login.
        if (err && err.status === 401) {
          return;
        }

        this.fileError = err && err.error && err.error.message
          ? err.error.message
          : 'Upload failed. Please try again.';
      }
    );
  }

  del(id: number) {
    this.api.deleteImage(id).subscribe(() => this.reload());
  }

  isPdf(fileUrl: string): boolean {
    return !!fileUrl && fileUrl.toLowerCase().split('?')[0].endsWith('.pdf');
  }

  safePdfUrl(image: any): SafeResourceUrl {
    const key = String(image && (image.id || image.imageUrl) || '');

    if (!this.safePdfUrls[key]) {
      const rawUrl = this.api.imageUrl(image.imageUrl) + '#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH';
      this.safePdfUrls[key] = this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
    }

    return this.safePdfUrls[key];
  }

  onAdminImageError(event: Event): void {
    const element = event.target as HTMLImageElement;
    if (element) {
      element.src = 'assets/images/global-digipic-banner.png';
    }
  }

  openDeleteBox(id: number) {
    this.selectedCategoryId = id;
    this.showDeleteBox = true;
  }

  closeDeleteBox() {
    this.showDeleteBox = false;
    this.selectedCategoryId = 0;
  }

  confirmDeleteCategory() {
    this.categoryError = '';

    this.api.deleteCategory(this.selectedCategoryId).subscribe(
      () => {
        this.closeDeleteBox();
        this.reload();
      },
      (error) => {
        console.log(error);
        this.closeDeleteBox();
        this.categoryError = 'Cannot delete category.';
      }
    );
  }
}

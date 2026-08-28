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
  allImages: any[] = [];

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

  showImageDeleteBox = false;
  selectedImageToDelete: any = null;
  deletingImage = false;
  deleteImageError = '';
  deleteImageSuccess = '';

  // Manage Images filter + pagination.
  selectedCategoryFilterId: number | null = null; // null = ALL
  currentPage = 0;                                // backend is zero-based
  pageSize = 10;
  totalPages = 0;
  totalElements = 0;
  loadingImages = false;
  imageListError = '';

  private safePdfUrls: { [key: string]: SafeResourceUrl } = {};

  constructor(
    public api: ApiService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.reload();
  }

  /**
   * Reload dynamic categories first, then load the currently selected image page.
   * Every category created by Admin automatically becomes a Manage Images filter.
   */
  reload() {
    this.api.categories().subscribe(
      (r) => {
        this.categories = r || [];

        // If the selected category was deleted, fall back to ALL.
        if (
          this.selectedCategoryFilterId != null &&
          !this.categories.some(
            (c) => Number(c.id) === Number(this.selectedCategoryFilterId)
          )
        ) {
          this.selectedCategoryFilterId = null;
          this.currentPage = 0;
        }

        this.loadImages();
      },
      () => {
        this.categories = [];
        this.selectedCategoryFilterId = null;
        this.currentPage = 0;
        this.loadImages();
      }
    );
  }

  /**
   * Load images from the existing working GET /api/images endpoint.
   * Filtering and pagination are handled in the Admin UI.
   *
   * This intentionally avoids /api/admin/images/page because the current
   * backend runtime does not expose that GET route correctly.
   */
  loadImages() {
    this.loadingImages = true;
    this.imageListError = '';

    this.api.images().subscribe(
      (r) => {
        this.loadingImages = false;

        // Keep one complete list in memory and always put newest uploads first.
        this.allImages = (r || []).slice().sort((a: any, b: any) => {
          const aTime = a && a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b && b.createdAt ? new Date(b.createdAt).getTime() : 0;

          if (aTime !== bTime) {
            return bTime - aTime;
          }

          // Fallback when old records have no createdAt.
          return Number((b && b.id) || 0) - Number((a && a.id) || 0);
        });

        this.applyImageFilterAndPagination();
        this.safePdfUrls = {};
      },
      (err) => {
        this.loadingImages = false;
        if (err && err.status === 401) {
          return;
        }

        this.allImages = [];
        this.images = [];
        this.totalPages = 0;
        this.totalElements = 0;
        this.imageListError =
          err && err.error && err.error.message
            ? err.error.message
            : 'Unable to load images. Please try again.';
      }
    );
  }

  /**
   * Dynamic category filtering + 10-per-page pagination.
   * null category means ALL.
   */
  private applyImageFilterAndPagination() {
    let filtered = this.allImages;

    if (this.selectedCategoryFilterId != null) {
      const selectedId = Number(this.selectedCategoryFilterId);
      filtered = this.allImages.filter(
        (image: any) => Number(image && image.categoryId) === selectedId
      );
    }

    this.totalElements = filtered.length;
    this.totalPages =
      this.totalElements === 0
        ? 0
        : Math.ceil(this.totalElements / this.pageSize);

    // If delete/filter makes the current page invalid, move to the last page.
    if (this.totalPages > 0 && this.currentPage >= this.totalPages) {
      this.currentPage = this.totalPages - 1;
    }

    if (this.currentPage < 0 || this.totalPages === 0) {
      this.currentPage = 0;
    }

    const start = this.currentPage * this.pageSize;
    this.images = filtered.slice(start, start + this.pageSize);
  }

  selectImageCategory(categoryId: number | null) {
    this.selectedCategoryFilterId = categoryId;
    this.currentPage = 0;
    this.applyImageFilterAndPagination();
    this.safePdfUrls = {};
  }

  isImageCategorySelected(categoryId: number | null): boolean {
    if (categoryId == null) {
      return this.selectedCategoryFilterId == null;
    }

    return Number(this.selectedCategoryFilterId) === Number(categoryId);
  }

  selectedFilterName(): string {
    if (this.selectedCategoryFilterId == null) {
      return 'ALL';
    }

    const found = this.categories.find(
      (c) => Number(c.id) === Number(this.selectedCategoryFilterId)
    );

    return found && found.name ? found.name : 'Category';
  }

  /** Show a compact maximum of five page-number buttons. */
  pageNumbers(): number[] {
    if (this.totalPages <= 0) {
      return [];
    }

    const maxButtons = 5;
    let start = Math.max(0, this.currentPage - 2);
    let end = Math.min(this.totalPages - 1, start + maxButtons - 1);

    if (end - start + 1 < maxButtons) {
      start = Math.max(0, end - maxButtons + 1);
    }

    const pages: number[] = [];
    for (let p = start; p <= end; p++) {
      pages.push(p);
    }

    return pages;
  }

  goToPage(page: number) {
    if (
      page < 0 ||
      page >= this.totalPages ||
      page === this.currentPage ||
      this.loadingImages
    ) {
      return;
    }

    this.currentPage = page;
    this.applyImageFilterAndPagination();
    this.safePdfUrls = {};
  }

  previousPage() {
    this.goToPage(this.currentPage - 1);
  }

  nextPage() {
    this.goToPage(this.currentPage + 1);
  }

  firstVisibleItem(): number {
    if (this.totalElements === 0) {
      return 0;
    }

    return this.currentPage * this.pageSize + 1;
  }

  lastVisibleItem(): number {
    return Math.min(
      (this.currentPage + 1) * this.pageSize,
      this.totalElements
    );
  }

  addCat() {
    this.categoryError = '';

    if (!this.catName || this.catName.trim() === '') {
      this.categoryError = 'Category name is required';
      return;
    }

    this.api
      .addCategory({ name: this.catName, description: this.catDesc })
      .subscribe(
        () => {
          this.catName = '';
          this.catDesc = '';
          this.reload();
        },
        (err) => {
          this.categoryError =
            err && err.error && err.error.message
              ? err.error.message
              : 'Could not add category.';
        }
      );
  }

  file(e: any) {
    this.selected =
      e.target.files && e.target.files.length ? e.target.files[0] : null;
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

        // Requirement: immediately show the latest upload at the top.
        // ALL + page 1 always contains the newest uploaded record.
        this.selectedCategoryFilterId = null;
        this.currentPage = 0;
        this.loadImages();
      },
      (err) => {
        // 401 is handled centrally by AuthInterceptor and redirects to Login.
        if (err && err.status === 401) {
          return;
        }

        this.fileError =
          err && err.error && err.error.message
            ? err.error.message
            : 'Upload failed. Please try again.';
      }
    );
  }

  openImageDeleteBox(image: any) {
    this.selectedImageToDelete = image;
    this.deleteImageError = '';
    this.deleteImageSuccess = '';
    this.showImageDeleteBox = true;
  }

  closeImageDeleteBox() {
    if (this.deletingImage) {
      return;
    }

    this.showImageDeleteBox = false;
    this.selectedImageToDelete = null;
    this.deleteImageError = '';
  }

  confirmDeleteImage() {
    if (
      !this.selectedImageToDelete ||
      !this.selectedImageToDelete.id ||
      this.deletingImage
    ) {
      return;
    }

    this.deletingImage = true;
    this.deleteImageError = '';
    const deletedName =
      this.selectedImageToDelete.name ||
      this.selectedImageToDelete.originalFileName ||
      'File';

    this.api.deleteImage(this.selectedImageToDelete.id).subscribe(
      () => {
        this.deletingImage = false;
        this.showImageDeleteBox = false;
        this.selectedImageToDelete = null;
        this.deleteImageSuccess = deletedName + ' deleted permanently.';
        this.loadImages();
      },
      (err) => {
        this.deletingImage = false;
        if (err && err.status === 401) {
          return;
        }
        this.deleteImageError =
          err && err.error && err.error.message
            ? err.error.message
            : 'Delete failed. The file was not removed. Please try again.';
      }
    );
  }

  isPdf(fileUrl: string): boolean {
    return !!fileUrl && fileUrl.toLowerCase().split('?')[0].endsWith('.pdf');
  }

  safePdfUrl(image: any): SafeResourceUrl {
    const key = String((image && (image.id || image.imageUrl)) || '');

    if (!this.safePdfUrls[key]) {
      const rawUrl =
        this.api.imageUrl(image.imageUrl) +
        '#toolbar=0&navpanes=0&scrollbar=0&page=1&view=FitH';
      this.safePdfUrls[key] =
        this.sanitizer.bypassSecurityTrustResourceUrl(rawUrl);
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
        const deletedCategoryId = this.selectedCategoryId;
        this.closeDeleteBox();

        if (
          this.selectedCategoryFilterId != null &&
          Number(this.selectedCategoryFilterId) === Number(deletedCategoryId)
        ) {
          this.selectedCategoryFilterId = null;
          this.currentPage = 0;
        }

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

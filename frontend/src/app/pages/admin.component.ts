import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { EnterpriseService } from '../services/enterprise.service';

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

  // Point 8 smart catalog metadata
  subcategory = ''; tags = ''; festivalEvent = ''; language = ''; orientation = ''; colourMetadata = '';
  widthPixels: any = ''; heightPixels: any = ''; dpi: any = ''; fileFormat = ''; fileSizeLabel = '';
  supportedLicenseTypes = 'STANDARD'; seoTitle = ''; seoDescription = ''; publicSlug = ''; previewUrl = '';
  defaultBulkPrice: any = ''; defaultBulkCategoryId = ''; zipFile: File | null = null; zipUploading = false;

  nameError = '';
  descError = '';
  categoryError = '';
  categoryManagementError = '';
  categorySuccess = '';
  deletingCategory = false;
  fileError = '';
  costError = '';
  successMessage = '';

  selected: any;

  // Requirement 10 - bulk upload integrated with the existing GalleryImage flow.
  showBulkUpload = false;
  bulkFiles: File[] = [];
  bulkRows: any[] = [];
  bulkUploading = false;
  bulkError = '';
  bulkResult: any = null;

  // Point 6 - moderation queue
  pendingDesigns: any[] = [];
  moderationLoading = false;
  moderationMessage = '';
  moderationComments: any = {};


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
    private sanitizer: DomSanitizer,
    private enterprise: EnterpriseService
  ) {}

  ngOnInit() {
    this.reload();
    this.loadPendingDesigns();
  }

  loadPendingDesigns() {
    this.moderationLoading = true;
    this.enterprise.pendingDesigns().subscribe(
      (rows: any[]) => { this.pendingDesigns = rows || []; this.moderationLoading = false; },
      () => { this.pendingDesigns = []; this.moderationLoading = false; }
    );
  }

  private currentAdminId(): number {
    var raw = localStorage.getItem('userId') || sessionStorage.getItem('userId') || '0';
    var id = Number(raw);
    return isNaN(id) ? 0 : id;
  }

  moderateDesign(d: any, action: string) {
    if (!d || !d.id) { return; }
    var adminId = this.currentAdminId();
    if (!adminId) { this.moderationMessage = 'Admin user id is missing. Please logout and login again.'; return; }
    var comment = this.moderationComments[d.id] || '';
    if ((action === 'CHANGES_REQUIRED' || action === 'REJECT') && !String(comment).trim()) {
      this.moderationMessage = 'Enter a moderation comment before requesting changes or rejecting.'; return;
    }
    this.moderationMessage = '';
    this.enterprise.moderate(Number(d.id), action, String(comment), adminId).subscribe(
      () => { this.moderationMessage = action === 'APPROVE' ? 'Design approved. Publish it when ready.' : 'Moderation decision saved.'; this.loadPendingDesigns(); },
      (e: any) => { this.moderationMessage = e && e.error && e.error.message ? e.error.message : 'Unable to save moderation decision.'; }
    );
  }

  publishApprovedDesign(d: any) {
    var adminId = this.currentAdminId();
    if (!adminId || !d || !d.id) { return; }
    this.enterprise.publishDesign(Number(d.id), adminId).subscribe(
      () => { this.moderationMessage = 'Design published successfully.'; this.loadPendingDesigns(); this.loadImages(); },
      () => { this.moderationMessage = 'Unable to publish design.'; }
    );
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
    this.categoryManagementError = '';

    if (!this.catName || this.catName.trim() === '') {
      this.categoryManagementError = 'Category name is required';
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
          this.categoryManagementError =
            err && err.error && err.error.message
              ? err.error.message
              : 'Could not add category.';
        }
      );
  }

  file(e: any) {
    this.selected = e.target.files && e.target.files.length ? e.target.files[0] : null;
    this.fileError = '';
    if (!this.selected) return;
    this.autoFillFromFile(this.selected, null);
  }

  private autoFillFromFile(file: File, row: any): void {
    const base = this.bulkNameFromFile(file.name);
    const ext = (file.name.split('.').pop() || '').toUpperCase();
    const slug = base.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    const target: any = row || this;
    if (!target.name) target.name = base;
    if (!target.desc) target.desc = 'Digital design - ' + base;
    if (row && !row.description) row.description = 'Digital design - ' + base;
    target.fileFormat = ext;
    target.seoTitle = base;
    target.seoDescription = 'Download ' + base + ' from Global DigiPic.';
    target.publicSlug = slug;
    if (!row) this.fileSizeLabel = this.formatBytes(file.size);
    if (file.type && file.type.indexOf('image/') === 0) {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        target.widthPixels = img.width;
        target.heightPixels = img.height;
        target.orientation = img.width === img.height ? 'Square' : (img.width > img.height ? 'Landscape' : 'Portrait');
        if (!row) { this.previewUrl = url; } else { URL.revokeObjectURL(url); }
      };
      img.onerror = () => URL.revokeObjectURL(url);
      img.src = url;
    }
  }

  private formatBytes(bytes: number): string {
    if (!bytes) return '0 B';
    const units = ['B', 'KB', 'MB', 'GB']; let n = bytes; let i = 0;
    while (n >= 1024 && i < units.length - 1) { n /= 1024; i++; }
    return n.toFixed(i ? 2 : 0) + ' ' + units[i];
  }

  applyDefaultBulkValues(): void {
    this.bulkRows.forEach((r: any) => {
      if ((r.cost === '' || r.cost === null || r.cost === undefined) && this.defaultBulkPrice !== '') r.cost = this.defaultBulkPrice;
      if (!r.categoryId && this.defaultBulkCategoryId) r.categoryId = this.defaultBulkCategoryId;
    });
  }

  onZipSelected(event: any): void {
    this.zipFile = event.target.files && event.target.files.length ? event.target.files[0] : null;
    this.bulkError = '';
  }

  uploadZip(): void {
    if (!this.zipFile) { this.bulkError = 'Choose a ZIP file first.'; return; }
    if (this.defaultBulkPrice === '' || Number(this.defaultBulkPrice) < 0) { this.bulkError = 'Enter a default price for ZIP files.'; return; }
    if (!this.defaultBulkCategoryId) { this.bulkError = 'Select a fallback category for ZIP files.'; return; }
    this.zipUploading = true; this.bulkError = ''; this.bulkResult = null;
    this.api.bulkUploadZip(this.zipFile, Number(this.defaultBulkPrice), Number(this.defaultBulkCategoryId)).subscribe(
      (result: any) => { this.zipUploading = false; this.bulkResult = result; this.loadImages(); },
      (err: any) => { this.zipUploading = false; this.bulkError = err && err.error && err.error.message ? err.error.message : 'ZIP upload failed.'; }
    );
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
    fd.append('subcategory', this.subcategory || ''); fd.append('tags', this.tags || ''); fd.append('festivalEvent', this.festivalEvent || '');
    fd.append('language', this.language || ''); fd.append('orientation', this.orientation || ''); fd.append('colourMetadata', this.colourMetadata || '');
    fd.append('widthPixels', String(this.widthPixels || '')); fd.append('heightPixels', String(this.heightPixels || '')); fd.append('dpi', String(this.dpi || ''));
    fd.append('supportedLicenseTypes', this.supportedLicenseTypes || 'STANDARD'); fd.append('seoTitle', this.seoTitle || '');
    fd.append('seoDescription', this.seoDescription || ''); fd.append('publicSlug', this.publicSlug || '');

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
    if (this.deletingCategory) return;
    this.categoryManagementError = '';
    this.categorySuccess = '';
    this.selectedCategoryId = id;
    this.showDeleteBox = true;
  }

  closeDeleteBox() {
    if (this.deletingCategory) return;
    this.showDeleteBox = false;
    this.selectedCategoryId = 0;
  }

  confirmDeleteCategory() {
    if (this.deletingCategory || !this.selectedCategoryId) return;
    this.categoryManagementError = '';
    this.categorySuccess = '';
    this.deletingCategory = true;
    const deletedCategoryId = this.selectedCategoryId;
    this.api.deleteCategory(deletedCategoryId).subscribe(
      () => {
        this.deletingCategory = false;
        this.closeDeleteBox();
        if (Number(this.selectedCategoryFilterId) === Number(deletedCategoryId)) {
          this.selectedCategoryFilterId = null;
          this.currentPage = 0;
        }
        if (Number(this.categoryId) === Number(deletedCategoryId)) this.categoryId = '';
        if (Number(this.defaultBulkCategoryId) === Number(deletedCategoryId)) this.defaultBulkCategoryId = '';
        this.bulkRows.forEach((row: any) => {
          if (Number(row.categoryId) === Number(deletedCategoryId)) row.categoryId = '';
        });
        this.categorySuccess = 'Category deleted successfully.';
        this.reload();
      },
      (error: any) => {
        this.deletingCategory = false;
        this.closeDeleteBox();
        this.categoryManagementError = error && error.error && error.error.message
          ? error.error.message : 'Could not delete category. Please try again.';
      }
    );
  }

  openBulkUpload() {
    this.showBulkUpload = true;
    this.bulkError = '';
    this.bulkResult = null;
  }

  closeBulkUpload() {
    if (this.bulkUploading) return;
    this.showBulkUpload = false;
  }

  onBulkFilesSelected(event: any) {
    const files: File[] = Array.from((event.target && event.target.files) || []);
    this.bulkFiles = files;
    this.bulkRows = files.map((file: File) => ({
      fileName: file.name,
      name: this.bulkNameFromFile(file.name),
      description: '',
      cost: '',
      categoryId: '', fileFormat: '', widthPixels: '', heightPixels: '', orientation: '', tags: '', seoTitle: '', publicSlug: ''
    }));
    this.bulkRows.forEach((row: any, i: number) => this.autoFillFromFile(files[i], row));
    this.bulkResult = null;
    this.bulkError = '';
  }

  private bulkNameFromFile(fileName: string): string {
    return (fileName || '')
      .replace(/\.[^/.]+$/, '')
      .replace(/[_-]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .replace(/\b\w/g, c => c.toUpperCase());
  }

  bulkRowValid(row: any): boolean {
    return !!row &&
      row.cost !== '' && row.cost !== null &&
      !isNaN(Number(row.cost)) && Number(row.cost) >= 0 &&
      !!row.categoryId;
  }

  bulkValidCount(): number {
    return this.bulkRows.filter(r => this.bulkRowValid(r)).length;
  }

  startBulkUpload() {
    this.bulkError = '';
    this.bulkResult = null;

    if (!this.bulkFiles.length) {
      this.bulkError = 'Select files first.';
      return;
    }
    if (this.bulkValidCount() !== this.bulkRows.length) {
      this.bulkError = 'Enter a valid cost and category for every design.';
      return;
    }

    this.bulkUploading = true;
    this.api.bulkUploadImages(this.bulkFiles, this.bulkRows).subscribe(
      (result: any) => {
        this.bulkUploading = false;
        this.bulkResult = result;
        this.loadImages();
      },
      (err: any) => {
        this.bulkUploading = false;
        this.bulkError = err && err.error && err.error.message
          ? err.error.message
          : 'Bulk upload failed.';
      }
    );
  }

}

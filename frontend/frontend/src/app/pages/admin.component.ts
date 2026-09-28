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
  subcategory = ''; tags = ''; festivalEvent = ''; language = ''; orientation = ''; colourMetadata = '';
  widthPixels: any = ''; heightPixels: any = ''; dpi: any = ''; supportedLicenseTypes = 'STANDARD'; contributorName = '';
  productStatus = 'PUBLISHED'; seoTitle = ''; seoDescription = ''; publicSlug = '';

  nameError = '';
  descError = '';
  categoryError = '';
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

  // Point 7 - copyright, ownership and marketplace governance
  copyrightComplaints: any[] = [];
  copyrightFilter = '';
  copyrightLoading = false;
  copyrightMessage = '';
  copyrightNotes: any = {};
  governanceHistoryRows: any[] = [];
  governanceHistoryDesignId: number | null = null;


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
    this.loadCopyrightComplaints();
  }


  loadCopyrightComplaints() {
    this.copyrightLoading = true;
    this.enterprise.copyrightComplaints(this.copyrightFilter).subscribe(
      (rows: any[]) => { this.copyrightComplaints = rows || []; this.copyrightLoading = false; },
      () => { this.copyrightComplaints = []; this.copyrightLoading = false; this.copyrightMessage = 'Unable to load copyright complaints.'; }
    );
  }

  reviewCopyright(c: any) {
    var adminId = this.currentAdminId();
    if (!adminId) { this.copyrightMessage = 'Admin user id is missing. Please logout and login again.'; return; }
    this.enterprise.reviewCopyrightComplaint(Number(c.id), adminId, String(this.copyrightNotes[c.id] || '')).subscribe(
      () => { this.copyrightMessage = 'Complaint moved to Under Review.'; this.loadCopyrightComplaints(); },
      (e:any) => this.copyrightMessage = e && e.error && e.error.message ? e.error.message : 'Unable to update complaint.'
    );
  }

  resolveCopyright(c: any, action: string) {
    var adminId = this.currentAdminId(); var note = String(this.copyrightNotes[c.id] || '').trim();
    if (!adminId) { this.copyrightMessage = 'Admin user id is missing. Please logout and login again.'; return; }
    if (!note) { this.copyrightMessage = 'Enter a resolution note before closing the complaint.'; return; }
    this.enterprise.resolveCopyrightComplaint(Number(c.id), adminId, action, note).subscribe(
      () => { this.copyrightMessage = 'Copyright decision saved. Design status and audit history were updated.'; this.loadCopyrightComplaints(); this.loadPendingDesigns(); },
      (e:any) => this.copyrightMessage = e && e.error && e.error.message ? e.error.message : 'Unable to resolve complaint.'
    );
  }

  loadGovernanceHistory(designId: number) {
    this.governanceHistoryDesignId = Number(designId);
    this.enterprise.governanceHistory(Number(designId)).subscribe(
      (rows:any[]) => this.governanceHistoryRows = rows || [],
      () => { this.governanceHistoryRows = []; this.copyrightMessage = 'Unable to load audit history.'; }
    );
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
      (uploaded: any) => {
        const metadata: any = {
          subcategory: this.subcategory, tags: this.tags, festivalEvent: this.festivalEvent, language: this.language,
          orientation: this.orientation, colourMetadata: this.colourMetadata,
          widthPixels: this.widthPixels === '' ? null : Number(this.widthPixels), heightPixels: this.heightPixels === '' ? null : Number(this.heightPixels),
          dpi: this.dpi === '' ? null : Number(this.dpi), supportedLicenseTypes: this.supportedLicenseTypes, contributorName: this.contributorName,
          productStatus: this.productStatus, seoTitle: this.seoTitle || this.name.trim(), seoDescription: this.seoDescription || this.desc.trim(), publicSlug: this.publicSlug
        };
        if (uploaded && uploaded.id) { this.api.updateCatalogMetadata(uploaded.id, metadata).subscribe(() => this.loadImages()); }
        this.successMessage = 'Digital product uploaded with catalog metadata';
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
      categoryId: ''
    }));
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

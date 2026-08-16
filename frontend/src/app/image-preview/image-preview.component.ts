import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  image: any = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public api: ApiService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Image ID not found in URL';
      this.loading = false;
      return;
    }

    this.api.getImageByCode(id).subscribe(
      (res: any) => {
        this.image = res;
        this.loading = false;
      },
      (err: any) => {
        console.error(err);
        this.errorMessage = 'Image preview not found';
        this.loading = false;
      }
    );
  }

  isPdf(image: any): boolean {
    if (!image) {
      return false;
    }

    const contentType = String(image.contentType || '').toLowerCase();
    const imageUrl = String(image.imageUrl || '').toLowerCase();
    const originalFileName = String(image.originalFileName || '').toLowerCase();

    return contentType === 'application/pdf' ||
      imageUrl.endsWith('.pdf') ||
      originalFileName.endsWith('.pdf');
  }

  getPreviewUrl(image: any): string {
    if (!image) {
      return 'assets/images/global-digipic-logo-4x6cm.jpeg';
    }

    // PDFs cannot be displayed inside an <img> tag.
    // Use the backend-generated first-page JPG thumbnail instead.
    if (this.isPdf(image)) {
      if (image.thumbnailUrl) {
        return this.api.imageUrl(image.thumbnailUrl);
      }

      return 'assets/images/global-digipic-logo-4x6cm.jpeg';
    }

    if (image.imageUrl) {
      return this.api.imageUrl(image.imageUrl);
    }

    if (image.thumbnailUrl) {
      return this.api.imageUrl(image.thumbnailUrl);
    }

    return 'assets/images/global-digipic-logo-4x6cm.jpeg';
  }

  onPreviewError(event: Event): void {
    const img = event.target as HTMLImageElement;

    if (!img) {
      return;
    }

    const fallback = 'assets/images/global-digipic-logo-4x6cm.jpeg';

    if (!img.src.endsWith(fallback)) {
      img.src = fallback;
    }
  }

  goBack() {
    this.router.navigate(['/']);
  }
}

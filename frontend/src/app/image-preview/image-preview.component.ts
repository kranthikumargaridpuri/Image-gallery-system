import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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

  pdfPreviewSrc: SafeResourceUrl | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public api: ApiService,
    private sanitizer: DomSanitizer
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

        if (this.image && this.isPdf(this.image.imageUrl)) {
          const pdfUrl = this.api.imageUrl(this.image.imageUrl) +
            '#page=1&zoom=page-width&toolbar=1&navpanes=0';
          this.pdfPreviewSrc =
            this.sanitizer.bypassSecurityTrustResourceUrl(pdfUrl);
        } else {
          this.pdfPreviewSrc = null;
        }

        this.loading = false;
      },
      (err: any) => {
        console.error(err);
        this.errorMessage = 'Image preview not found';
        this.loading = false;
      }
    );
  }

  isPdf(path: string): boolean {
    if (!path) {
      return false;
    }

    const cleanPath = path.split('?')[0].split('#')[0].toLowerCase();
    return cleanPath.endsWith('.pdf');
  }

  goBack() {
    this.router.navigate(['/']);
  }
}
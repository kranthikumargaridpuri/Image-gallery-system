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

  goBack() {
    this.router.navigate(['/']);
  }
}
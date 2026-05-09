import { Component, Input } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent {

  @Input() image: any;

  constructor(public api: ApiService) {}

}
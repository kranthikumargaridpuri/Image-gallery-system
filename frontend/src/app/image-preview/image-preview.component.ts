import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { ApiService } from "../services/api.service";

@Component({
  selector: "app-image-preview",
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.css']
})
export class ImagePreviewComponent implements OnInit {

  image: any;

  constructor(
    private route: ActivatedRoute,
    public api: ApiService
  ) {}

ngOnInit() {

  const code = this.route.snapshot.paramMap.get("id");

  this.api.getImageByCode(code).subscribe((data: any) => {

    this.image = data;

  });

}

  goBack() {
    window.history.back();
  }


}
import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
@Component({
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  items: any[] = [];
  constructor(public api: ApiService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.api.cart().subscribe((r) => (this.items = r));
  }
  remove(id) {
    this.api.removeCart(id).subscribe(() => this.load());
  }
}

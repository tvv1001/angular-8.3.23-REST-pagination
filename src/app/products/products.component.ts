import { Component, OnInit } from "@angular/core";
import { ApiService } from "../api.service";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductComponent implements OnInit {
  products = [];
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService.get().subscribe((data: any[]) => {
      console.log(data);
      this.products = data;
    });
  }
}

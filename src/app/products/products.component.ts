import { Component, OnInit, OnDestroy } from "@angular/core";
import { ApiService } from "../api.service";
import { HttpResponse } from "@angular/common/http";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"]
})
export class ProductComponent implements OnInit, OnDestroy {
  products = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private apiService: ApiService) {}
  ngOnInit() {
    this.apiService
      .sendGetRequest()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log("init response");
        console.log(res);
        this.products = res.body;
      });
  }
  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }

  public firstPage() {
    console.log("-------------------------");
    console.log("first page");
    console.log(this.apiService);
    console.log(this.apiService.next);
    console.log("-------------------------");

    this.products = [];
    this.apiService
      .sendGetRequestToUrl(this.apiService.first)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
  public previousPage() {
    console.log("-------------------------");
    console.log("prev page");
    console.log(this.apiService);
    console.log(this.apiService.next);
    console.log("-------------------------");

    if (this.apiService.prev !== undefined && this.apiService.prev !== "") {
      this.products = [];
      this.apiService
        .sendGetRequestToUrl(this.apiService.prev)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          console.log(res);
          this.products = res.body;
        });
    }
  }
  public nextPage() {
    console.log("-------------------------");
    console.log("next page");
    console.log(this.apiService);
    console.log(this.apiService.next);
    console.log("-------------------------");

    if (this.apiService.next !== undefined && this.apiService.next !== "") {
      this.products = [];
      this.apiService
        .sendGetRequestToUrl(this.apiService.next)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: HttpResponse<any>) => {
          // console.log("next response");
          // console.log(res);
          this.products = res.body;
        });
    }
  }
  public lastPage() {
    console.log("-------------------------");
    console.log("last page");
    console.log(this.apiService);
    console.log(this.apiService.next);
    console.log("-------------------------");

    this.products = [];
    this.apiService
      .sendGetRequestToUrl(this.apiService.last)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: HttpResponse<any>) => {
        console.log(res);
        this.products = res.body;
      });
  }
}

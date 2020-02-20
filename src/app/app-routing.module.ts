import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ProductComponent } from "./home/home.component";
import { OneComponent } from "./one/one.component";
import { AboutComponent } from "./about/about.component";

const routes: Routes = [
  { path: "", redirectTo: "/products", pathMatch: "full" },
  { path: "products", component: ProductComponent },
  { path: "section-one", component: OneComponent },
  { path: "about", component: AboutComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

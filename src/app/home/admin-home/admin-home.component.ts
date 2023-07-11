import { Component, OnInit } from '@angular/core';
import { AddProductService } from 'src/app/admin-add-product/add-product.service';
import { product } from 'src/app/shared/addProductDataType';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
})
export class AdminHomeComponent implements OnInit {
  productList: undefined | product[];
  productMessage: undefined | string;

  constructor(private productService: AddProductService) {}

  ngOnInit(): void {
    this.displayProductList();
  }

  displayProductList() {
    this.productService.displayProductList().subscribe((result) => {
      console.log(result);
      if (result) {
        this.productList = result;
      }
    });
  }

  deleteProduct(id: number) {
    // console.log(id);
    this.productService.deleteProduct(id).subscribe((result) => {
      if (result) {
        this.productMessage = 'The Product has been deleted...!';
        this.displayProductList();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }

  deleteProductByName(name: string) {
    this.productService.deleteProductByName(name).subscribe((result) => {
      if (result) {
        this.productMessage = 'The Product has been deleted...!';
        this.displayProductList();
      }
    });
    setTimeout(() => {
      this.productMessage = undefined;
    }, 3000);
  }
}

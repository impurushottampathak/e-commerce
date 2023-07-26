import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { product } from 'src/app/shared/addProductDataType';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product | any;
  productQuantity: number = 1;
  totalAmount!: number;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails() {
    let productid = this.activatedRoute.snapshot.paramMap.get('productid');
    productid && this.productService.getProduct(productid).subscribe((result) => {
      this.productData = result;
      if (this.productQuantity = 1) {
        this.totalAmount = this.productData.price;
      }
    })
  }

  manageQuantity(value: string) {
    if (this.productQuantity < 20 && value === 'max') {
      this.productQuantity += 1;
      this.totalAmount = this.productQuantity * this.productData?.price;
    } else if (this.productQuantity > 1 && value === 'min') {
      this.productQuantity -= 1;
      this.totalAmount = this.productQuantity * this.productData?.price;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity=this.productQuantity;
      if(!localStorage.getItem('user')){
        this.productService.localAddToCart(this.productData);
      }
      console.log(this.productData)
    }
  }
}

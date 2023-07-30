import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { ProductService } from 'src/app/service/product.service';
import { product } from 'src/app/shared/addProductDataType';
import { cart } from 'src/app/shared/cartDataType';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  productData: undefined | product | any;
  productQuantity: number = 1;
  totalAmount!: number;
  removeCartItem = false;
  cartData?: product;
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
      let cartData = localStorage.getItem('localCart');
      if (productid && cartData) {
        let items = JSON.parse(cartData);
        items = items.filter((item: product) => productid === item.id.toString());
        if (items.length) {
          this.removeCartItem = true;
        } else {
          this.removeCartItem = false;
        }
      }
      let user = localStorage.getItem('user');
      if (user) {
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
        this.productService.cartData.subscribe((result) => {
          let item = result.filter((item: product) => productid?.toString() === item.productId?.toString());
          if (item.length) {
            this.cartData = item[0];
            this.removeCartItem = true;
          }
        })
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

  addToCart() {
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.localAddToCart(this.productData);
        this.removeCartItem = true;
      } else {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        let cartData: cart = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              this.productService.getCartList(userId);
              this.removeCartItem = true;
            }
          });
        }, 300);
      }
    }
  }

  removeFromCart(productId: number) {
    if (!localStorage.getItem('user')) {
      this.productService.localRemoveItemFromCart(productId);
    } else {
      console.log("cartdata", this.cartData)
      this.cartData && this.productService.removeItemFromCart(this.cartData.id).subscribe((result) => {
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id;
        this.productService.getCartList(userId);
      })
    }
    this.removeCartItem = false;
  }
}

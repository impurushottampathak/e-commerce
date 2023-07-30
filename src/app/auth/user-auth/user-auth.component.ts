import { Component, OnInit } from '@angular/core';
import { userLogin, userSignUp } from 'src/app/shared/userDataTypes';
import { AuthserviceService } from '../authservice.service';
import { product } from 'src/app/shared/addProductDataType';
import { cart } from 'src/app/shared/cartDataType';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
  showLogin = false;
  loginError = '';

  constructor(private authService: AuthserviceService, private productService: ProductService) { }

  ngOnInit(): void {
    this.authService.reloadUser();
  }

  signUp(data: userSignUp) {
    this.authService.userSignUp(data);
  }

  login(data: userLogin) {
    this.authService.userLogin(data);
    this.authService.isLoginError.subscribe((result) => {
      if (result) {
        this.loginError = "User not Found";
      } else {
        console.log("user found")
        this.localCartToRemote();
      }
    });
  }

  openLogin() {
    this.showLogin = true;
  }

  openSignUp() {
    this.showLogin = false;
  }

  localCartToRemote() {
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (data) {
      let cartDataList: product[] = JSON.parse(data);
      cartDataList.forEach((product: product, index) => {
        let cartData: cart = {
          ...product,
          productId: product.id,
          userId
        }
        delete cartData.id;
        setTimeout(() => {
          this.productService.addToCart(cartData).subscribe((result) => {
            if (result) {
              console.log("Data added to db")
            }
          })
        }, 300);
        if (cartDataList.length === index + 1) {
          localStorage.removeItem('localCart');
        }
      });
    }
    setTimeout(() => {
      this.productService.getCartList(userId);
    }, 2000);
  }

}

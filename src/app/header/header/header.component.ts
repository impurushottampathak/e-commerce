import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { product } from 'src/app/shared/addProductDataType';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuType: string = 'default';
  adminName: string = '';
  userName: string = '';
  searchProductList: undefined | product[];
  cartItem:number =0;

  constructor(private route: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val: any) => {
      if (val.url) {
        // console.log(val.url);
        if (localStorage.getItem('admin') && val.url.includes('admin')) {
          let adminStore: any = localStorage.getItem('admin');
          let adminStoreData: any = JSON.parse(adminStore);
          this.adminName = adminStoreData[0].name;
          this.menuType = 'admin';
        } else if (localStorage.getItem('user')) {
          let userStore: any = localStorage.getItem('user');
          let userStoreData: any = userStore && JSON.parse(userStore);
          this.userName = userStoreData.name;
          this.menuType = 'user';
          this.productService.getCartList(userStoreData.id);
        } else {
          console.log('Outside admin space');
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItem = JSON.parse(cartData).length;
    }
    this.productService.cartData.subscribe((items)=>{
      this.cartItem = items.length;
    })
  }

  logout() {
    localStorage.removeItem('admin');
    this.route.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.route.navigate(['user-auth']);
    this.productService.cartData.emit([])
  }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.productService.searchProducts(element.value).subscribe((result) => {
        //To represent only 5 products in search result we can restrict result length
        if (result.length > 5) {
          result.length = length;
        }
        this.searchProductList = result;
        console.log(result);
      })
    }
  }

  hideSearchResult() {
    this.searchProductList = undefined;
  }

  searchSubmit(value: string) {
    console.log(value);
    this.route.navigate([`search/${value}`]);
  }

  redirectingToDetails(id: number) {
    this.route.navigate([`/details/` + id]);
  }
}

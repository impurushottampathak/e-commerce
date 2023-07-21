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

  menuType:string='default';
  adminName:string='';
  searchProductList:undefined|product[];

  constructor(private route:Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.route.events.subscribe((val:any)=>{
      if(val.url){
        // console.log(val.url);
        if(localStorage.getItem('admin') && val.url.includes('admin')){
            let adminStore:any = localStorage.getItem('admin');
            let adminStoreData:any = JSON.parse(adminStore)
            this.adminName = adminStoreData[0].name
            this.menuType = 'admin'
        }else{
          console.log('Outside admin space');
          this.menuType ='default';
        }
      }
    })
  }

  logout(){
    localStorage.removeItem('admin');
    this.route.navigate(['/']);
  }

  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      console.log(element.value);
      this.productService.searchProducts(element.value).subscribe((result)=>{
        //To represent only 5 products in search result we can restrict result length
        if(result.length>5){
          result.length = length;
        }
        this.searchProductList = result;
        console.log(result);
      })
    }    
  }

  hideSearchResult(){
    this.searchProductList = undefined;
  }

}

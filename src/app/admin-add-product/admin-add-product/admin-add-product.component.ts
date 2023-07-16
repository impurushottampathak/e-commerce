import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/shared/addProductDataType';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-add-product',
  templateUrl: './admin-add-product.component.html',
  styleUrls: ['./admin-add-product.component.css']
})
export class AdminAddProductComponent implements OnInit {

  addProductMsg:string|undefined;

  constructor(private ProductService:ProductService){}

  ngOnInit(): void {
    
  }

  addNewProduct(data:product){
    console.log(data)
    this.ProductService.addProduct(data).subscribe((result)=>{console.log(result)
      if(result){
        this.addProductMsg='Product is added successfully';
      }
    });
    setTimeout(()=>{
      this.addProductMsg=undefined;
      window.location.reload();
    },5000)

  }
}

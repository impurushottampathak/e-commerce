import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { product } from 'src/app/shared/addProductDataType';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productData : undefined | product;
  productUpdateMessage : undefined | string;

  constructor(private route:ActivatedRoute, private productService: ProductService, private router:Router) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((result)=>{
      console.log(result)
      this.productData = result;
    })
  }

  update(data:product){
    if(this.productData){
      data.id = this.productData.id;
    }
    this.productService.updateProduct(data).subscribe((result)=>{
      if(result){
        this.productUpdateMessage= "Successfully Updated Product Information...!";
      }
    });
    setTimeout(() => {
        this.productUpdateMessage = undefined;
        this.router.navigate(['admin-home']);
    }, 5000);
  }
}

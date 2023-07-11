import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from 'src/app/shared/addProductDataType';
import { AddProductService } from '../add-product.service';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {

  productData : undefined | product;

  constructor(private route:ActivatedRoute, private productService: AddProductService) { }

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.productService.getProduct(productId).subscribe((result)=>{
      console.log(result)
      this.productData = result;
    })
  }

  update(data:product){
    
  }
}

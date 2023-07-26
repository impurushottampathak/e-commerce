import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { product } from 'src/app/shared/addProductDataType';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  popularProducts: undefined | product[];
  trendyProducts: undefined | product[];

  constructor(private productService : ProductService, private route:Router) { }

  ngOnInit(): void {
    this.productService.popularProducts().subscribe((result)=>{
      this.popularProducts = result;

    this.productService.trendyProducts().subscribe((result)=>{
      this.trendyProducts = result;
    })
    })
  }

  redirectingToDetails(id:number){
    setTimeout(()=>{
      this.route.navigate([`/details/`+id]);
      window.location.reload();
    },2000)
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { product } from 'src/app/shared/addProductDataType';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {

  searchResults : undefined | product[];

  constructor(private productService:ProductService, private activeRoute:ActivatedRoute) { }

  ngOnInit(): void {
    let query = this.activeRoute.snapshot.paramMap.get('query'); //This name "query" should be same as name declared in app-routing path
    //Below it is checking condition if query is null
    query && this.productService.searchProducts(query).subscribe((result)=>{  
      this.searchResults = result;
    })
  }
}

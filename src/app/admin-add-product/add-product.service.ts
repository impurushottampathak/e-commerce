import { Injectable } from '@angular/core';
import { product } from '../shared/addProductDataType';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddProductService {

  constructor(private http:HttpClient) { }

  addProduct(data:product){
    return this.http.post("http://localhost:3000/products",data);
  }

  displayProductList(){
    return this.http.get<product[]>("http://localhost:3000/products")
  }

  deleteProduct(id:number){
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  deleteProductByName(name:string){
    return this.http.delete(`http://localhost:3000/products/${name}`)
  }

  getProduct(id:string){
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }
}

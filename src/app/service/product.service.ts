import { EventEmitter, Injectable } from '@angular/core';
import { product } from '../shared/addProductDataType';
import { HttpClient } from '@angular/common/http';
import { cart } from '../shared/cartDataType';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }
  cartData = new EventEmitter<product[] | []>();

  addProduct(data: product) {
    return this.http.post("http://localhost:3000/products", data);
  }

  displayProductList() {
    return this.http.get<product[]>("http://localhost:3000/products")
  }

  deleteProduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`)
  }

  deleteProductByName(name: string) {
    return this.http.delete(`http://localhost:3000/products/${name}`)
  }

  getProduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`)
  }

  updateProduct(data: product) {
    return this.http.put<product>(`http://localhost:3000/products/${data.id}`, data)
  }

  popularProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=3`) //this will limit product data upto 3 entires
  }

  trendyProducts() {
    return this.http.get<product[]>(`http://localhost:3000/products?_limit=10`) //this will limit product data upto 10 entires
  }

  searchProducts(query: string) {
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`)
  }

  localAddToCart(data: product) {
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if (!localCart) {
      localStorage.setItem('localCart', JSON.stringify([data]));
      this.cartData.emit([data]);
    } else {
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart', JSON.stringify(cartData));
      this.cartData.emit(cartData);
    }
  }

  localRemoveItemFromCart(productId: number) {
    let cartData = localStorage.getItem('localCart');
    if (cartData) {
      let items: product[] = JSON.parse(cartData);
      items = items.filter((item: product) => productId !== item.id);
      localStorage.setItem('localCart', JSON.stringify(items))
      this.cartData.emit(items);
    }
  }

  addToCart(cartData: cart) {
    return this.http.post(`http://localhost:3000/cart`, cartData);
  }

  getCartList(userId: number) {
    return this.http.get<product[]>(`http://localhost:3000/cart?userId=${userId}`, { observe: 'response' }).subscribe((result) => {
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }

  removeItemFromCart(cartId: number) {
    return this.http.delete('http://localhost:3000/cart/'+cartId);
  }
}

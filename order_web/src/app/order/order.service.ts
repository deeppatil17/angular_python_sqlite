import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { Order } from './order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _httpClient:HttpClient) { }
  private baseUrl:String="/api/orders/";

  getOrders():Observable<Order[]>{
    return this._httpClient.get<Order[]>(`${environment.apiUrl}${this.baseUrl}`);
  }
  createOrder(data:Order){
    return this._httpClient.post<Order>(`${environment.apiUrl}${this.baseUrl}`,data);
  }
  updateOrder(data:Order){
    return this._httpClient.put<Order>(`${environment.apiUrl}${this.baseUrl}${data.id}/`,data);
  }
  deleteOrder(id:Number){
    return this._httpClient.delete<Order>(`${environment.apiUrl}${this.baseUrl}${id}/`);
  }
}

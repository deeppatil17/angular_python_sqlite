import { AfterViewInit, Component, ViewChild } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatTableDataSource,MatTableModule} from '@angular/material/table';
import { Order } from '../order';
import { OrderService } from '../order.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule,MatTableModule,FormsModule,CommonModule,MatSortModule,MatPaginator],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'product', 'quantity', 'price','edit','delete'];
  dataSource = new MatTableDataSource<Order>();
  @ViewChild(MatSort) sort: any;
  @ViewChild(MatPaginator) paginator: any;

  orders:Order[]=[];
  filteredOrders:Order[]=[];
  quantity:any=undefined
  price:any=undefined

  order:Order={
    id:0,
    product:'',
    quantity:this.quantity,
    price:this.price
  }

  constructor(private orderService:OrderService){}

  ngAfterViewInit(): void {
      this.orderService.getOrders().subscribe((data)=>{
        this.orders=data;
        this.dataSource=new MatTableDataSource<Order>(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      })
  }

  setOrder(order:Order){
    this.order.id=order.id;
    this.order.price=order.price;
    this.order.quantity=order.quantity;
    this.order.product=order.product;
  }

  addEditOrder(order:Order){
    if(order.id!==0){
      //update order
      this.orderService.updateOrder(order).subscribe({
        next:(data)=>{
          console.log("Product updated Successfully");
          window.location.reload();          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }else{
      //create a new order
      this.orderService.createOrder(order).subscribe({
        next:(data)=>{
          console.log("New product created Successfully");
          window.location.reload();          
        },
        error:(err)=>{
          console.log(err);
          
        }
      })
    }

  }

  searchOrders(input:any){
    this.filteredOrders=this.orders.filter(item=>item.product.toLowerCase().includes(input.toLowerCase()) ||
    item.quantity.toString().includes(input) || item.price.toString().includes(input) );
    this.dataSource=new MatTableDataSource<Order>(this.filteredOrders);
    
  }

  deleteOrder(id:Number){
    const isConfirmed=window.confirm("Are you sure you want to Delete?");
    if(isConfirmed){
      this.orderService.deleteOrder(id).subscribe((data)=>{
        this.orders=this.orders.filter(item=>item.id!==id)
      })
      window.location.reload();  
    }
  }
}

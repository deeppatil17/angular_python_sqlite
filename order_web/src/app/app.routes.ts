import { Routes } from '@angular/router';
import { HomeComponent } from './order/home/home.component';

export const routes: Routes = [
    {path:"order/home",component:HomeComponent},
    {path:"order",redirectTo:"order/home",pathMatch:"full"},
    {path:"",redirectTo:"order/home",pathMatch:"full"}
];

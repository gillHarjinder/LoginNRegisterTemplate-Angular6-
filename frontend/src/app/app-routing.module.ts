import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';


// This is where we define all the routes and it
// happens as an ARRAY OF OBJECTS
// path and what display as components
const routes: Routes = [
    {
        path: '/',
        component: HomeComponent
    },
    {
        path: 'register/',
        component: RegisterComponent
    },
    {
        path: 'login',
        component: LoginComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
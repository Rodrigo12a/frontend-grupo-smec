import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { QuoteComponent } from './pages/quote/quote.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { UserComponent } from './pages/dashboard/user/user.component';
import { QuoteDashboardComponent } from './pages/dashboard/quote-dashboard/quote-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ElectricComponent } from './pages/electric/electric.component';
import { WeldingComponent } from './pages/welding/welding.component';
import { AlbumComponent } from './pages/album/album.component';
import { authGuard } from './utils/auth.guard';
import { UpdateUserComponent } from './pages/dashboard/update-user/update-user.component';
import { InsertUserComponent } from './pages/dashboard/insert-user/insert-user.component';

export const routes: Routes = [
  {
    path: '',
    component:LandingPageComponent
  },
  {
    path: 'login',
    component:LoginComponent
  },
  {
    path: 'register',
    component:RegisterComponent
  },
  {
    path: 'about-us',
    component:AboutUsComponent
  },
  {
    path: 'quote',
    component: QuoteComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user',
    component: UserComponent, canActivate: [authGuard]
  },{
    path: 'update-user',
    component: UpdateUserComponent, canActivate: [authGuard]
  },
  {
    path: 'insert-user',
    component: InsertUserComponent, canActivate: [authGuard]
  },
  {
    path: 'update-user/:id',
    component: InsertUserComponent, canActivate: [authGuard]
  },
  {
    path: 'quote-dashboard',
    component: QuoteDashboardComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'electric',
    component: ElectricComponent
  },
  {
    path: 'welding',
    component: WeldingComponent
  },
  {
    path: 'album',
    component: AlbumComponent
  },
  {
    path: '**', redirectTo: 'landing', pathMatch: 'full'
  }
];

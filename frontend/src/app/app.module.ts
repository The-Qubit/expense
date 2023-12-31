import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    SidebarComponent,
    NavbarComponent,
    SettingsComponent,
    AnalyticsComponent,
    TransactionsComponent,
    SubscriptionComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

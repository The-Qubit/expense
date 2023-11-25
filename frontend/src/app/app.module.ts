import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SignupComponent } from './pages/signup/signup.component';
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpenseComponent } from './pages/expense/expense.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { YearlyOverviewComponent } from './charts/yearly-overview/yearly-overview.component';
import { SubscriptionComponent } from './pages/subscription/subscription.component';
import { PerCategoryComponent } from './charts/per-category/per-category.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SignupComponent,
    LoginComponent,
    ExpenseComponent,
    SidebarComponent,
    NavbarComponent,
    SettingsComponent,
    AnalyticsComponent,
    TransactionsComponent,
    YearlyOverviewComponent,
    SubscriptionComponent,
    PerCategoryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { SettingsComponent } from './pages/settings/settings.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { AuthGuard } from './auth.guard.guard';
import { SubscriptionComponent } from './pages/subscription/subscription.component';

const routes: Routes = [
  { path: "", redirectTo: "dashboard", pathMatch: "full"},
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
  { path: "subscription", component: SubscriptionComponent, canActivate: [AuthGuard] },
  { path: "transactions", component: TransactionsComponent, canActivate: [AuthGuard] },
  { path: "analytics", component: AnalyticsComponent, canActivate: [AuthGuard] },
  { path: "settings", component: SettingsComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

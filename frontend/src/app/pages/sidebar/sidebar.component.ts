import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  items: { label: string; icon: string, route: string }[] = [
    { label: 'Dashboard', icon: 'bi bi-grid-1x2', route: '' },
    { label: 'Transactions', icon: 'bi bi-arrow-down-up', route: 'transactions' },
    { label: 'Subscriptions', icon: 'bi bi-calendar-check', route: 'subscription' },
    // { label: 'Analytics', icon: 'bi bi-graph-up', route: 'analytics' },
    { label: 'Settings', icon: 'bi bi-gear',route: 'settings' }
  ];
  activeIndex: number = 0;

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }
}
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent{
  items: { label: string; icon: string, route: string }[] = [
    { label: 'Dashboard', icon: 'bi bi-grid-1x2', route: '' },
    { label: 'New Expense', icon: 'bi bi-coin', route: 'expense' },
    { label: 'Analytics', icon: 'bi bi-graph-up', route: 'analytics' },
    { label: 'Transactions', icon: 'bi bi-arrow-down-up', route: 'transactions' },
    { label: 'Settings', icon: 'bi bi-gear',route: 'settings' }
  ];
  activeIndex: number = 0;

  setActiveIndex(index: number): void {
    this.activeIndex = index;
  }
}
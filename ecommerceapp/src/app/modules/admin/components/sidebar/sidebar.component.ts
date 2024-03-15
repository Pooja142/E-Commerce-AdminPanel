import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  sidebarlist: any = [
    {
      label: "Product",
      link: "/category",
      active: true,
      icon: "\u{1F6D2}", 
    },
    {
      label: "Items",
      link: "/product",
      active: false,
      icon: "\u{1F6D2}", 
    }
  ];

  constructor() {}

  changeRoute(index: number) {
    this.sidebarlist.forEach((item: any, i: number) => {
      this.sidebarlist[i].active = false;
    });
    this.sidebarlist[index].active = true;
  }

  ngOnInit(): void {}
}

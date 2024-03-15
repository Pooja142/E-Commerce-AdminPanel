import { Component } from '@angular/core';

@Component({ 
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  adminPictureUrl: string = 'https://cdn.pixabay.com/photo/2018/08/28/12/41/avatar-3637425_640.png'; 
  adminName: string = 'Admin'; 
}

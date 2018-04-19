import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = '';

  constructor() { }

  navList = [
    { menuIcon: 'home', menuName: 'Home', menuRoute: 'list' },
    { menuIcon: 'order', menuName: 'My Orders', menuRoute: 'addnew' },
    { menuIcon: 'cart', menuName: 'Cart', menuRoute: './' },
    { menuIcon: 'heart', menuName: 'Wish List', menuRoute: './' },
    { menuIcon: 'language', menuName: 'Language', menuRoute: './' },
    { menuIcon: 'download', menuName: 'Download App', menuRoute: './' },
    { menuIcon: 'help', menuName: 'Help', menuRoute: './' },
    { menuIcon: 'feedback', menuName: 'Feedback', menuRoute: './' },
  ];

  ngOnInit() {
  }

  }

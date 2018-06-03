import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { AppUser } from '../core/models';
import { DataService } from '../core/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-app-user',
  templateUrl: './app-user.component.html',
  styleUrls: ['./app-user.component.scss']
})
export class AppUserComponent implements OnInit {

  user: Observable<AppUser>;
  userid: string;
  constructor(private authService: AuthService,
              private dataService: DataService ) {


  }


  ngOnInit() {
     this.userid = this.authService.currUserID;
     console.log(this.userid);
     this.user = this.dataService.getUserByID(this.userid);
     this.user.subscribe(user => {
       const name = user.displayName;
       const url = user.photoURL;

       console.log(name, url);

     });


  }

}

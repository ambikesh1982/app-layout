import { Component, OnInit, OnDestroy } from '@angular/core';
import { Fooditem, AppUser } from '../../core/models';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../core/auth.service';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  // fooditems$: Observable<Fooditem>; // To show more fooditems form the same user.
  fooditem: Fooditem;
  preview: string;
  fooditemImageCount: number;
  fabActionIcon: string;
  subscription: Subscription;


  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router) {
    this.fooditem = this.route.snapshot.data['product'];
  }

  ngOnInit() {

    if (this.auth.currAppUser) {
      console.log('User already unwrapped:', this.auth.currAppUser);
      this.setFabAction(this.auth.currAppUser.uid);
    } else {
      console.log('No unwrapped appUser, Subscribing and getting the user info');
      this.auth.currUser$.pipe(
        take(1)
      ).subscribe(user => {
        if (user) {
          this.setFabAction(user.uid);
        }
      });
    }

    this.fooditemImageCount = this.fooditem.images.length;
    console.log('Fooditem from resolver: ', this.fooditem);
    this.preview = this.fooditem.images[0].url;

  }

  setFabAction(uid: string) {
    switch (uid) {
      case this.fooditem.createdBy:
        this.fabActionIcon = 'edit';
        break;
      default:
        this.fabActionIcon = 'chat_bubble_outline';
        break;
    }
  }

  onClickFab(action: string) {
    switch (action) {
      case 'chat_bubble_outline':
        this.router.navigate(['chat', this.fooditem.id]);
        break;
      case 'edit':
        this.router.navigate(['modify', this.fooditem.id]);
        break;
      default:
        this.router.navigate(['chat', this.fooditem.id]);
        this.fabActionIcon = 'chat_bubble_outline';
        break;
    }
    // routerLink = "/product/chat/{{fooditem.id}}
    // this.router.navigate(['/product/chat/', this.fooditem.id]);
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}

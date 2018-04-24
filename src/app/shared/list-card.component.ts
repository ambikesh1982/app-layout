import { Component, OnInit, Input } from '@angular/core';
import { Fooditem } from '../core/models';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-list-card',
  templateUrl: './list-card.component.html',
  styles: ['img { height: 33vh; margin-bottom: 0;}']
})
export class ListCardComponent implements OnInit {

  @Input() fooditem: Fooditem;

  constructor() { }

  ngOnInit() {
  }

}

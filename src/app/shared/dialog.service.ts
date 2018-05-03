import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DialogService {

  constructor() { }
  confirm(message?: string): boolean {
    console.log('canDeactivate Guard');
    return window.confirm(message || 'Are you sure?');
  }

}

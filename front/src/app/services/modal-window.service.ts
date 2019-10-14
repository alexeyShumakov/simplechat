import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalWindowService {

  text = '';
  isOpen = false;

  constructor() { }

  open () {
    this.isOpen = true;
  }

  openWithText(text: string) {
    this.text = text;
    this.open();
  }

  close () {
    this.isOpen = false;
  }
}

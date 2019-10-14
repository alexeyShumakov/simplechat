import {Component, OnInit} from '@angular/core';
import {ModalWindowService} from "../services/modal-window.service";

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.css']
})
export class ModalWindowComponent implements OnInit {

  constructor(
    private modalWindowService: ModalWindowService
  ) { }

  ngOnInit() {
  }

}

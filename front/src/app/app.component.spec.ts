import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {ModalWindowComponent} from "./modal-window/modal-window.component";
import {HeaderComponent} from "./header/header.component";
import {MessagesListComponent} from "./messages-list/messages-list.component";
import {MessageFormComponent} from "./message-form/message-form.component";
import {ReactiveFormsModule} from "@angular/forms";

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent, ModalWindowComponent, HeaderComponent,
        MessagesListComponent, MessageFormComponent
      ],
      imports: [ReactiveFormsModule]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

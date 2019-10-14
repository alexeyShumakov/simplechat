import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {MessagesListComponent} from './messages-list/messages-list.component';
import {MessageFormComponent} from './message-form/message-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ModalWindowComponent} from './modal-window/modal-window.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MessagesListComponent,
    MessageFormComponent,
    ModalWindowComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

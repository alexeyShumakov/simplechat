import {Component, OnInit} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {MessagesService} from "../services/messages.service";
import {ModalWindowService} from "../services/modal-window.service";

const errorsMap = {
  required: (error) => `This field is required`,
  maxLength: ({ requiredLength, actualLength }) => `Expect max length ${requiredLength} but got ${actualLength}`,
  pattern: ({requiredPattern, actualValue}) => `This value does not match the required pattern ${requiredPattern}.`
};

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent implements OnInit {

  constructor(
    private messageService: MessagesService,
    private modalWindowService: ModalWindowService,
  ) { }
  message = new FormControl('', [
    Validators.required,
    Validators.maxLength(250)
  ]);
  name = new FormControl('', [
    Validators.required,
    Validators.maxLength(20),
    Validators.pattern(/^[a-zа-я0-9]+$/i)
  ]);
  setNameCommand = 'myname';
  command = `/${this.setNameCommand} `;

  ngOnInit() {
  }

  getFirstErrorText(formControl: FormControl) {
    const firstKey = Object.keys(formControl.errors)[0];
    const getError = errorsMap[firstKey];
    return getError(formControl.errors[firstKey]);
  }

  getName(): string {
     return this.message.value.replace(this.command, '');
  }

  resetMessage() {
    this.message.reset();
    this.message.setValue('');
  }

  runNameCommand() {
    const name = this.getName();
    this.name.setValue(name);
    let modalWindowText = 'Name set successfully';
    if (this.name.valid) {
      this.messageService.userName = name;
      this.resetMessage();
    } else {
      modalWindowText = this.getFirstErrorText(this.name);
    }
    this.modalWindowService.openWithText(modalWindowText);
    this.name.reset();
  }

  isCommand(): boolean {
    return this.message.value.startsWith(this.command);
  }

  processMessageValue() {
    if (this.isCommand()) {
      this.runNameCommand();
    } else {
      this.sendMessage();
    }
  }

  sendMessage() {
    if (!this.messageService.isUserNameSetup()) {
      this.modalWindowService.openWithText('User name is not setup, please use command `/myname Bob`');
      return
    }
    if (this.message.valid) {
      this.messageService.createMessage(this.message.value);
      this.resetMessage();
      return
    }
    this.modalWindowService.openWithText(
      this.getFirstErrorText(this.message)
    );
  }

}

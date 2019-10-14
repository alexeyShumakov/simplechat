import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MessageFormComponent} from './message-form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ModalWindowService} from "../services/modal-window.service";
import {MessagesService} from "../services/messages.service";

let messagesServiceStub: Partial<MessagesService>;

messagesServiceStub = {
  userName: '',
  isUserNameSetup(): boolean { return false },
  createMessage(message: string) { }
};

describe('MessageFormComponent', () => {
  let component: MessageFormComponent;
  let fixture: ComponentFixture<MessageFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessageFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        ModalWindowService,
        {provide: MessagesService, useValue: messagesServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('#resetMessage', () => {
    component.message.setValue('/myname foo');
    component.resetMessage();
    expect(component.message.value).toEqual('');

  });

  it('#getName', () => {
    component.message.setValue('/myname foo');
    const name = component.getName();
    expect(name).toEqual('foo');
  });

  it('#isCommand', () => {
    component.message.setValue('/myname foo');
    expect(component.isCommand()).toBeTruthy();
  });

  describe('#runNameCommand', () => {
    it('show error if invalid name', () => {
      let mwService = fixture.debugElement.injector.get(ModalWindowService);
      component.message.setValue('/myname he!!o');
      component.runNameCommand();
      expect(mwService.isOpen).toBeTruthy();
    });
    it('set name if it valid', () => {
      let mwService = fixture.debugElement.injector.get(ModalWindowService);
      let messagesService = fixture.debugElement.injector.get(MessagesService);
      component.message.setValue('/myname bob');
      component.runNameCommand();
      expect(mwService.isOpen).toBeTruthy();
      expect(messagesService.userName).toEqual('bob');
    });
  });

  describe('#sendMessage', () => {
    let mwService: ModalWindowService;
    let messagesService = messagesServiceStub;
    beforeEach(() => {
      mwService = fixture.debugElement.injector.get(ModalWindowService);
      messagesService = fixture.debugElement.injector.get(MessagesService);
    });

    it('not send if name is not setup', () => {
      spyOn(messagesService, 'isUserNameSetup').and.returnValue(false);
      component.sendMessage();
      expect(mwService.isOpen).toBeTruthy();
    });
    it('send if name setup and valid message', () => {
      spyOn(messagesService, 'isUserNameSetup').and.returnValue(true);
      spyOn(messagesService, 'createMessage');
      messagesService.userName = 'Bob';
      component.message.setValue('valid message');
      component.sendMessage();
      expect(mwService.isOpen).toBeFalsy();
      expect(messagesService.createMessage).toHaveBeenCalledWith('valid message');
    });

    it('it not send if message is invalid', () => {
      spyOn(messagesService, 'isUserNameSetup').and.returnValue(true);
      spyOn(messagesService, 'createMessage');
      messagesService.userName = 'Bob';
      component.message.setValue('');
      component.sendMessage();
      expect(mwService.isOpen).toBeTruthy();
      expect(messagesService.createMessage).not.toHaveBeenCalled();
    });
  });

  describe('#processMessageValue', () => {
    it('set name', () => {
      spyOn(component, 'runNameCommand').and.returnValue();
      component.message.setValue('/myname bob');
      component.processMessageValue();
      expect(component.runNameCommand).toHaveBeenCalled();
    });
    it('call sendMessage', () => {
      spyOn(component, 'sendMessage').and.returnValue();
      component.message.setValue('hi bob');
      component.processMessageValue();
      expect(component.sendMessage).toHaveBeenCalled();
    });
  });
});

import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ModalWindowComponent} from './modal-window.component';
import {ModalWindowService} from "../services/modal-window.service";

describe('ModalWindowComponent', () => {
  let component: ModalWindowComponent;
  let fixture: ComponentFixture<ModalWindowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalWindowComponent ],
      providers: [ModalWindowService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalWindowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close window when click to button', () => {
    let mwService = fixture.debugElement.injector.get(ModalWindowService);
    spyOn(mwService, 'close');
    let button = fixture.debugElement.nativeElement.querySelector('button');
    button.click();

    expect(mwService.close).toHaveBeenCalled();
    expect(mwService.isOpen).toBeFalsy();
  });

  it('should close window when click to bg', () => {
    let mwService = fixture.debugElement.injector.get(ModalWindowService);
    spyOn(mwService, 'close');
    let button = fixture.debugElement.nativeElement.querySelector('.modal-background');
    button.click();

    expect(mwService.close).toHaveBeenCalled();
    expect(mwService.isOpen).toBeFalsy();
  });

  it('change class', () => {
    let mwService = fixture.debugElement.injector.get(ModalWindowService);
    let wrapper = fixture.debugElement.nativeElement.querySelector('.modal');
    expect(wrapper.className).toEqual('modal');
    mwService.isOpen = true;
    fixture.detectChanges();
    expect(wrapper.className).toEqual('modal is-active');
  });
});

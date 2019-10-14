import {TestBed} from '@angular/core/testing';

import {ModalWindowService} from './modal-window.service';

describe('ModalWindowService', () => {
  let service: ModalWindowService;
  beforeEach(() =>{
    TestBed.configureTestingModule({});
    service = TestBed.get(ModalWindowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('#open', () => {
    service.open();
    expect(service.isOpen).toBeTruthy();
  });

  it('#openWithText', () => {
    service.openWithText('foo');
    expect(service.isOpen).toBeTruthy();
    expect(service.text).toEqual('foo');
  });

  it('#close', () => {
    service.isOpen = true;
    service.close();
    expect(service.isOpen).toBeFalsy();
  });
});

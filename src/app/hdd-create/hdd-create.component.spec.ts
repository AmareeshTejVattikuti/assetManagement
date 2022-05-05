import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HddCreateComponent } from './hdd-create.component';

describe('HddCreateComponent', () => {
  let component: HddCreateComponent;
  let fixture: ComponentFixture<HddCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HddCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HddCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

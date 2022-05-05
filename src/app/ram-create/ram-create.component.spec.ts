import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamCreateComponent } from './ram-create.component';

describe('RamCreateComponent', () => {
  let component: RamCreateComponent;
  let fixture: ComponentFixture<RamCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodyColumnComponent } from './body-column.component';

describe('BodyColumnComponent', () => {
  let component: BodyColumnComponent;
  let fixture: ComponentFixture<BodyColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodyColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodyColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

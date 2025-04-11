import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendenceviewComponent } from './attendenceview.component';

describe('AttendenceviewComponent', () => {
  let component: AttendenceviewComponent;
  let fixture: ComponentFixture<AttendenceviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendenceviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendenceviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

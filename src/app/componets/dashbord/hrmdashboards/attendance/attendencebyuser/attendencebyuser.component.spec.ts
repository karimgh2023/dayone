import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendencebyuserComponent } from './attendencebyuser.component';

describe('AttendencebyuserComponent', () => {
  let component: AttendencebyuserComponent;
  let fixture: ComponentFixture<AttendencebyuserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttendencebyuserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttendencebyuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

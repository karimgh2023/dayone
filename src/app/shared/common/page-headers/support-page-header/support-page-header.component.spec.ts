import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportPageHeaderComponent } from './support-page-header.component';

describe('SupportPageHeaderComponent', () => {
  let component: SupportPageHeaderComponent;
  let fixture: ComponentFixture<SupportPageHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportPageHeaderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportPageHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

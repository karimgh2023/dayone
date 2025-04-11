import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportFooterComponent } from './support-footer.component';

describe('SupportFooterComponent', () => {
  let component: SupportFooterComponent;
  let fixture: ComponentFixture<SupportFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupportFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupportFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

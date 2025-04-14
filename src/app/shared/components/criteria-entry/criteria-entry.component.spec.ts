import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaEntryComponent } from './criteria-entry.component';

describe('CriteriaEntryComponent', () => {
  let component: CriteriaEntryComponent;
  let fixture: ComponentFixture<CriteriaEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CriteriaEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CriteriaEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

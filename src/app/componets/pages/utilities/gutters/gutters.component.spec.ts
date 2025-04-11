import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuttersComponent } from './gutters.component';

describe('GuttersComponent', () => {
  let component: GuttersComponent;
  let fixture: ComponentFixture<GuttersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuttersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GuttersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

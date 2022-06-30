import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharetersAllComponent } from './chareters-all.component';

describe('CharetersAllComponent', () => {
  let component: CharetersAllComponent;
  let fixture: ComponentFixture<CharetersAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharetersAllComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharetersAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

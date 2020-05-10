import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequisitionDashboardComponent } from './requisition-dashboard.component';

describe('RequisitionDashboardComponent', () => {
  let component: RequisitionDashboardComponent;
  let fixture: ComponentFixture<RequisitionDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequisitionDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequisitionDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

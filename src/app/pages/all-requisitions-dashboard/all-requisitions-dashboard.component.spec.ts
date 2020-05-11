import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRequisitionsDashboardComponent } from './all-requisitions-dashboard.component';

describe('AllRequisitionsDashboardComponent', () => {
  let component: AllRequisitionsDashboardComponent;
  let fixture: ComponentFixture<AllRequisitionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllRequisitionsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRequisitionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

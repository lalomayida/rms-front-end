import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignedRequisitionsDashboardComponent } from './assigned-requisitions-dashboard.component';

describe('AssignedRequisitionsDashboardComponent', () => {
  let component: AssignedRequisitionsDashboardComponent;
  let fixture: ComponentFixture<AssignedRequisitionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignedRequisitionsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignedRequisitionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

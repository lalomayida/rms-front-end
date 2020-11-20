import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRequisitionsDashboardComponent } from './my-requisitions-dashboard.component';

describe('MyRequisitionsDashboardComponent', () => {
  let component: MyRequisitionsDashboardComponent;
  let fixture: ComponentFixture<MyRequisitionsDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyRequisitionsDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyRequisitionsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

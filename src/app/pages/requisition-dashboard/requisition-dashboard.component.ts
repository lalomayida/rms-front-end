import { Component, OnInit } from '@angular/core';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'app-requisition-dashboard',
  templateUrl: './requisition-dashboard.component.html',
  styleUrls: ['./requisition-dashboard.component.scss']
})
export class RequisitionDashboardComponent implements OnInit {

  constructor(
    public accessChecker: NbAccessChecker
  ) {}

  ngOnInit() {
  }
}

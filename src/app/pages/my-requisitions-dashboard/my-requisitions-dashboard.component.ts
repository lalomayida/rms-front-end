import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { RequisitionService } from "src/services/requisition/requisition.service";
import { Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbDialogService } from '@nebular/theme';


@Component({
  selector: 'app-my-requisitions-dashboard',
  templateUrl: './my-requisitions-dashboard.component.html',
  styleUrls: ['./my-requisitions-dashboard.component.scss']
})
export class MyRequisitionsDashboardComponent implements OnInit {

  columns = [
    {
      prop: 'id',
      name: 'Id'
    }
    , {
      prop: 'room.name',
      name: 'Nombre'
    }
    , {
      prop: 'agent.name',
      name: 'Capacidad'
    }
    , {
      prop: 'initial_date',
      name: "Fecha Inicial"
    }
    , {
      prop: 'final_date',
      name: "Fecha Final"
    }
    , {
      prop: 'status.name',
      name: "Status"
    }
  ];

  rows = [];
  sessionUser;
  header:String = '';
  body:String = '';

  constructor(
    private requisitionService: RequisitionService,
    private authService: NbAuthService,
    private router: Router,
    private dialogService: NbDialogService,
    public accessChecker: NbAccessChecker
  ) {
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.sessionUser = token.getPayload();
        }
      });
  }

  ngOnInit() {
    this.setRequisitions();
  }

  setRequisitions(): void {
    this.requisitionService.getUserRequisitions(this.sessionUser.id).subscribe(
      result => {
        if (result.status === 'success') {
          this.rows = result.data;
        }
      }
    );
  }

  editRequisition(idRoom): void {
    this.router.navigate(['pages/requisition-edit'], {
      queryParams: {
        id: idRoom
      }
    });
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  deleteRequisition(idRequisition, successDialog: TemplateRef<any>): void {
    
      this.requisitionService.deleteRequisition({ id: idRequisition }).subscribe(
        result => {
          if (result.status === 'success') {
            this.header = 'Éxito'
            this.body = 'La requisición se ha eliminado con éxito'
            this.open(successDialog)
            this.setRequisitions();
          }
        }
      );
    
  }

}

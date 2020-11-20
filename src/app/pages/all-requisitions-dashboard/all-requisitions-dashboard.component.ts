import { Component, OnInit, Output, TemplateRef } from '@angular/core';
import { RequisitionService } from "src/services/requisition/requisition.service";
import { Router } from '@angular/router';
import { NbAccessChecker } from '@nebular/security';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'app-all-requisitions-dashboard',
  templateUrl: './all-requisitions-dashboard.component.html',
  styleUrls: ['./all-requisitions-dashboard.component.scss']
})
export class AllRequisitionsDashboardComponent implements OnInit {


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
      prop: 'user.name',
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
  header:String = '';
  body:String = '';

  constructor(
    private requisitionService: RequisitionService,
    private router: Router,
    private dialogService: NbDialogService,
    public accessChecker: NbAccessChecker
  ) {
  }

  ngOnInit() {
    this.setRequisitions();
  }

  setRequisitions(): void {
    this.requisitionService.getAllRequisitions().subscribe(
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
  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }


}

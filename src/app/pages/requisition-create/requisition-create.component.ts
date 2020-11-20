import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService, NbDialogConfig, NbDateService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { DeparmentService } from "src/services/department/department.service";
import { RoomService } from "src/services/room/room.service";
import { NeedService } from "src/services/need/need.service";
import { RequisitionService } from "src/services/requisition/requisition.service";

import { Requisition } from 'src/app/models/requisition';
import { Department } from 'src/app/models/department';
import { Room } from 'src/app/models/room';
import { Need } from 'src/app/models/need';
import { User } from 'src/app/models/user';
import { Agent } from 'src/app/models/agent';

@Component({
  selector: 'app-requisition-create',
  templateUrl: './requisition-create.component.html',
  styleUrls: ['./requisition-create.component.scss'],
  providers: [DeparmentService, RoomService, NeedService, RequisitionService]
})
export class RequisitionCreateComponent implements OnInit {

  requisition: Requisition = new Requisition(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [], []);
  user: User = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  agent: Agent = new Agent(0,null,null,null,null,null,null,null,null);
  deparment: Department[] = [];
  room: Room[] = [];
  need: Need[] = [];
  roomId: Number = 0;
  deparmentId: Number = 0;
  min: Date;
  max: Date;
  header: String = '';
  body: String = '';

  constructor(
    private authService: NbAuthService,
    private requisitionService: RequisitionService,
    private deparmentService: DeparmentService,
    private needService: NeedService,
    private roomService: RoomService,
    protected dateService: NbDateService<Date>,
    private router: Router,
    private dialogService: NbDialogService,
  ) {
    this.min = this.dateService.addMonth(this.dateService.today(), 0);
    this.max = this.dateService.addMonth(this.dateService.today(), 2);

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

  }

  ngOnInit(): void {
    this.setDepartments();
    this.setRooms();
    this.setNeeds();
  }

  setDepartments() {
    this.deparmentService.getDepartment().subscribe(
      result => {
        if (result.status === 'success') {
          this.deparment = result.data;
        }
      }
    );
  }

  setRooms() {
    this.roomService.getRooms().subscribe(
      result => {
        if (result.status === 'success') {
          this.room = result.data;
        }
      }
    );
  }

  setNeeds() {
    this.needService.getNeed().subscribe(
      result => {
        if (result.status === 'success') {
          this.need = result.data;
        }
      }
    );
  }

  addQuantity(event: any, id) {
    if (event.target.value.length != 0) {
      this.requisition.need.forEach(need => {
        if (need.id == id) {
          need.quantity = event.target.value;
        }
      });
    }
  }

  addRequisitionNeed(event: any, id) {

    if (event) {
      this.need.forEach(need => {
        if (need.id == id) {
          this.requisition.need.push(need);
        }
      });
    }
    else {
      this.requisition.need.forEach(need => {
        if (need.id == id) {
          var index = this.requisition.need.indexOf(need);
          this.requisition.need.splice(index, 1);
        }
      })
    }
  }

  create(dialog: TemplateRef<any>) {

    this.room.forEach(room => {
      if (room.id == this.roomId) {
        this.requisition.room = room;
      }
    });

    this.deparment.forEach(deparment => {
      if (deparment.id == this.deparmentId) {
        this.requisition.deparment = deparment;
      }
    });

    this.requisition.user = this.user;
    this.requisition.agent = this.agent;

    console.log(this.requisition)

    this.requisitionService.createRequisition(this.requisition).subscribe(
      result => {
        if (result.status === 'success') {
          this.header ="Éxito";
          this.body = "La instalación se ha creado exitosamente";
          this.open(dialog);
          this.router.navigate(['pages/requisition-dashboard'])
        }
      }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  cancel() {
    this.router.navigate(['pages/requisition-dashboard'])
  }
}

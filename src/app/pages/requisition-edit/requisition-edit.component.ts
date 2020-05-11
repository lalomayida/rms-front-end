import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  selector: 'app-requisition-edit',
  templateUrl: './requisition-edit.component.html',
  styleUrls: ['./requisition-edit.component.scss'],
  providers: [DeparmentService, RoomService, NeedService, RequisitionService]
})
export class RequisitionEditComponent implements OnInit {

  requisition: Requisition = new Requisition(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [], []);
  user: User = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  agent: Agent = new Agent(0,null,null,null,null,null,null,null,null);
  deparment: Department[] = [];
  room: Room[] = [];
  need: Need[] = [];
  roomName: String = '';
  deparmentName: String = '';
  min: Date;
  max: Date;
  header: String = '';
  body: String = '';

  messages: any[] = [];

  sendMessage(event: any, userName: string, avatar: string, reply: boolean) {
    const files = !event.files ? [] : event.files.map((file) => {
      return {
        url: file.src,
        type: file.type,
        icon: 'file-text-outline',
      };
    });

    this.messages.push({
      text: event.message,
      date: new Date(),
      reply: reply,
      type: files.length ? 'file' : 'text',
      files: files,
      user: {
        name: userName,
        avatar: avatar,
      },
    });
  }

  constructor(
    private authService: NbAuthService,
    private requisitionService: RequisitionService,
    private needService: NeedService,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
    private router: Router,
    private activeRoute: ActivatedRoute,
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

  async ngOnInit(): Promise<void> {
    var requisitionId = this.activeRoute.snapshot.queryParams.id;
    this.setRequisition(requisitionId);
  }

  setRequisition(id): void {
    this.requisitionService.getRequisitionInformation(id).subscribe(
      result => {
        if (result.status === 'success') {
          this.requisition = result.data;
          this.roomName = this.requisition.room.name;
          this.deparmentName = this.requisition.deparment.name;
          this.setNeeds();
        }
      }
    );
  }

  setNeeds() {
    this.needService.getNeed().subscribe(
      result => {
        if (result.status === 'success') {
          this.need = result.data;
          this.need.forEach(comboNeed=>{
            this.requisition.need.forEach(objNeed =>{
              if(comboNeed.id == objNeed.id){
                comboNeed.quantity = objNeed.quantity
              }
            });  
          })
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

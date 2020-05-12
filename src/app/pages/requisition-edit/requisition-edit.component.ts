import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NbDialogService, NbDialogConfig, NbDateService } from '@nebular/theme';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';

import { RequisitionService } from "src/services/requisition/requisition.service";
import { StatusService } from "src/services/status/status.service";

import { Requisition } from 'src/app/models/requisition';
import { Department } from 'src/app/models/department';
import { Room } from 'src/app/models/room';
import { Need } from 'src/app/models/need';
import { User } from 'src/app/models/user';
import { Agent } from 'src/app/models/agent';
import { Status } from 'src/app/models/status';
import { Comment } from 'src/app/models/comment';

import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'app-requisition-edit',
  templateUrl: './requisition-edit.component.html',
  styleUrls: ['./requisition-edit.component.scss'],
  providers: [RequisitionService, StatusService]
})
export class RequisitionEditComponent implements OnInit {

  requisition: Requisition = new Requisition(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, [], []);
  sessionUser: User = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  roomName: String = '';
  deparmentName: String = '';
  agentName: String = '';
  userName: String = '';
  statusName: String = '';
  statusId: Number = 0;
  status: Status[] = [];
  min: Date;
  max: Date;
  header: String = '';
  body: String = '';
  level: Number = 0;
  messages: any[] = [];

  constructor(
    private authService: NbAuthService,
    private requisitionService: RequisitionService,
    private statusService: StatusService,
    protected dateService: NbDateService<Date>,
    private dialogService: NbDialogService,
    private router: Router,
    public accessChecker: NbAccessChecker,
    private activeRoute: ActivatedRoute,
  ) {
    this.min = this.dateService.addMonth(this.dateService.today(), 0);
    this.max = this.dateService.addMonth(this.dateService.today(), 2);

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.sessionUser = token.getPayload();
          console.log(this.sessionUser)
        }
      });
  }

  async ngOnInit(): Promise<void> {
    var requisitionId = this.activeRoute.snapshot.queryParams.id;
    this.setRequisition(requisitionId);
    this.setStatus();
  }

  sendMessage(event: any, receivedUser: User, reply: boolean) {
    console.log(receivedUser)
    this.messages.push({
      comment: event.message,
      submit_date: new Date(),
      reply: reply,
      user: receivedUser
    });

    let newComment: Comment = new Comment(0, event.message, receivedUser, new Date());
    this.requisition.comment.push(newComment);
    console.log(this.requisition);
    console.log(this.messages);
  }

  setRequisition(id): void {
    this.requisitionService.getRequisitionInformation(id).subscribe(
      result => {
        if (result.status === 'success') {
          this.requisition = result.data;
          this.roomName = this.requisition.room.name;
          this.deparmentName = this.requisition.deparment.name;
          this.agentName = this.requisition.agent.name + ' ' + this.requisition.agent.surname;
          this.userName = this.requisition.user.name + ' ' + this.requisition.user.surname;
          this.statusId = this.requisition.status.id;
          this.statusName = this.requisition.status.name;
          this.level = this.requisition.agent.level;
          this.setMessages();
        }
      }
    );
  }

  setMessages() {
    this.messages = this.requisition.comment;
    this.messages.forEach(message => {
      if (message.user.id === this.sessionUser.id) {
        message.reply = false;
      }
      else {
        message.reply = true;
      }
    });
    this.requisition.comment = [];
  }

  setStatus() {
    this.statusService.getStatus().subscribe(result => {
      if (result.status === 'success') {
        this.status = result.data;
      }
    })
  }

  edit(dialog: TemplateRef<any>) {

    this.status.forEach(status => {
      if (status.id == this.statusId) {
        this.requisition.status = status;
      }
    });

    console.log(this.requisition)

    this.requisitionService.editRequisition(this.requisition).subscribe(
      result => {
        if (result.status === 'success') {
          this.header = "Éxito";
          this.body = "La requisición se ha editado exitosamente";
          this.open(dialog);
          this.router.navigate(['pages/requisition-dashboard'])
        }
      }
    )
  }

  promote(dialog: TemplateRef<any>) {

    this.status.forEach(status => {
      if (status.id == this.statusId) {
        this.requisition.status = status;
      }
    });

    console.log(this.requisition)

    this.requisitionService.promoteRequisition(this.requisition).subscribe(
      result => {
        if (result.status === 'success') {
          this.header = "Éxito";
          this.body = "La requisicion se ha promovido al siguiente nivel exitosamente";
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

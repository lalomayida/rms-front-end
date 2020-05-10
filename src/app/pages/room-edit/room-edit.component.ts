import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoomTypeService } from "src/services/room-type/room-type.service";
import { RoomService } from "src/services/room/room.service";
import { RoomAttributeService } from "src/services/room-attributes/room-attributes.service";

import { RoomType } from 'src/app/models/room-type';
import { RoomAttribute } from 'src/app/models/room-attribute';
import { Room } from 'src/app/models/room';

import { NbDialogService, NbDialogConfig } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'app-room-edit',
  templateUrl: './room-edit.component.html',
  styleUrls: ['./room-edit.component.scss'],
  providers: [RoomTypeService, RoomAttributeService]
})
export class RoomEditComponent implements OnInit {

  roomTypes: RoomType[];
  roomAttributes: RoomAttribute[];
  roomTypeId: Number = 0;
  roomTypeName: String = '';
  room: Room;
  header:String = '';
  body:String = '';

  constructor(
    private roomTypeService: RoomTypeService,
    private roomAttributeService: RoomAttributeService,
    private roomService: RoomService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    public accessChecker: NbAccessChecker
  ) { }

  async ngOnInit(): Promise<void> {
    this.room = new Room(undefined, undefined, undefined, undefined, undefined, undefined, undefined, []);
    var roomId = this.activeRoute.snapshot.queryParams.id;
    this.setRoom(roomId);
  }

  setRoom(id): void {
    this.roomService.getRoomInformation(id).subscribe(
      result => {
        if (result.status === 'success') {
          this.room = result.data;
          this.roomTypeId = this.room.type.id;
          this.roomTypeName = this.room.type.name;
          this.setRoomTypes();
          this.setRoomAttributes();
        }
      }
    );
  }

  setRoomTypes(): void {
    this.roomTypeService.getRoomTypes().subscribe(
      result => {
        if (result.status === 'success') {
          this.roomTypes = result.data;
        }
      }
    );
  }

  setRoomAttributes(): void {
    this.roomAttributeService.getRoomAttributes().subscribe(
      result => {
        if (result.status === 'success') {
          this.roomAttributes = result.data;
          this.roomAttributes.forEach(comboAttribute=>{
            this.room.attribute.forEach(objAttribute =>{
              if(comboAttribute.id == objAttribute.id){
                comboAttribute.quantity = objAttribute.quantity
              }
            });  
          })
        }
      });
  }

  addQuantity(event: any, id) {
    if (event.target.value.length != 0) {
      this.room.attribute.forEach(attribute => {
        if (attribute.id == id) {
          attribute.quantity = event.target.value;
        }
      });
    }
  }

  addRoomAttribute(event: any, id) {
    if (event) {
      this.roomAttributes.forEach(attribute => {
        if (attribute.id == id) {
          this.room.attribute.push(attribute);
        }
      });
    }
    else {
      this.room.attribute.forEach(attribute => {
        if (attribute.id == id) {
          var index = this.room.attribute.indexOf(attribute);
          this.room.attribute.splice(index, 1);
        }
      });
      this.roomAttributes.forEach(attribute => {
        if (attribute.id == id && attribute.quantity) {
          delete attribute.quantity;
        }
      });
    }
  }

  create(dialog: TemplateRef<any>) {

    this.roomTypes.forEach(room => {
      if (room.id == this.roomTypeId) {
        this.room.type = room;
      }
    });

    this.roomService.editRoom(this.room).subscribe(
      result => {
        if (result.status === 'success') {
          this.header ="Éxito";
          this.body = "La instalación se ha editado exitosamente";
          this.open(dialog);
          this.router.navigate(['pages/room-dashboard'])
        }
      }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  cancel() {
    this.router.navigate(['pages/room-dashboard'])
  }

}

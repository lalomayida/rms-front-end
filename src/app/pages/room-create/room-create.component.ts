import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RoomTypeService } from "src/services/room-type/room-type.service";
import { RoomService } from "src/services/room/room.service";
import { RoomAttributeService } from "src/services/room-attributes/room-attributes.service";

import { RoomType } from 'src/app/models/room-type';
import { RoomAttribute } from 'src/app/models/room-attribute';
import { Room } from 'src/app/models/room';

import { NbDialogService, NbDialogConfig } from '@nebular/theme';

@Component({
  selector: 'app-room-create',
  templateUrl: './room-create.component.html',
  styleUrls: ['./room-create.component.scss'],
  providers: [RoomTypeService, RoomAttributeService]
})
export class RoomCreateComponent implements OnInit {

  roomTypes: RoomType[];
  roomAttributes: RoomAttribute[];
  roomTypeId: Number;
  room: Room;
  header:String = '';
  body:String = '';

  constructor(
    private roomTypeService: RoomTypeService,
    private roomAttributeService: RoomAttributeService,
    private roomService: RoomService,
    private router: Router,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.setRoomsTypes();
    this.setRoomAttributes();
    this.room = new Room(undefined, undefined, undefined, undefined, undefined, undefined, undefined, []);
    this.roomTypeId = 0;
  }

  setRoomsTypes(): void {
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
        }
      }
    );
  }

  addQuantity(event: any, id){
    if(event.target.value.length != 0){
      this.room.attribute.forEach(attribute => {
        if (attribute.id == id) {
          attribute.quantity = event.target.value ;
        }
      });
    }
  }

  addRoomAttribute(event: any, id){    
    
    if (event){
        this.roomAttributes.forEach(attribute => {
          if (attribute.id == id) {
            this.room.attribute.push(attribute);
          }
        });
      }
      else{
        this.room.attribute.forEach(attribute =>{
          if (attribute.id == id) {
            var index = this.room.attribute.indexOf(attribute);
            this.room.attribute.splice(index,1);
          }
        })
      }
  }

  create(dialog: TemplateRef<any>) {

    this.roomTypes.forEach(room => {
      if (room.id == this.roomTypeId) {
        this.room.type = room;
      }
    });

    this.room.is_visible = true;
    this.roomService.createRoom(this.room).subscribe(
      result => {
        if (result.status === 'success') {
          this.header ="Éxito";
          this.body = "La instalación se ha creado exitosamente";
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

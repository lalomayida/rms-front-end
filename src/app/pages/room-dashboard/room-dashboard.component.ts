import { Component, OnInit, Output } from '@angular/core';
import { RoomService } from "src/services/room/room.service";
import { Room } from 'src/app/models/room';
import {Router} from '@angular/router';

@Component({
  selector: 'app-room-dashboard',
  templateUrl: './room-dashboard.component.html',
  styleUrls: ['./room-dashboard.component.scss'],
  providers: [RoomService]
})
export class RoomDashboardComponent implements OnInit {

  columns = [
    {
      prop: 'id',
      name: 'Id'
    }
    , {
      prop: 'name',
      name: 'Nombre'
    }
    , {
      prop: 'capacity',
      name: 'Capacidad'
    }
    , {
      prop: 'width',
      name: "Ancho"
    }
    , {
      prop: 'length',
      name: "Largo"
    }
    , {
      prop: 'is_visible',
      name: "Visible"
    }
  ];

  rows = [];
  temp = [];

  constructor(
    private roomSerivce: RoomService,
    private router: Router
  ) {}

  ngOnInit() {
    this.setRooms();
  }

  setRooms(): void {
    this.roomSerivce.getRooms().subscribe(
      result => {
        if (result.status === 'success') {
          this.rows = result.data;
          this.temp = result.data;
        }
      }
    );
  }

  editRoom(idRoom): void{
    this.router.navigate(['/room-edit'],{
      queryParams: {
        id:idRoom
      }
    });
  }

  updateFilter(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
  }

}

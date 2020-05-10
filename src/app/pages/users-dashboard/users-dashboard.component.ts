import { Component, OnInit, Output } from '@angular/core';
import { UserService } from "src/services/user/user.service";
import { User } from 'src/app/models/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-users-dashboard',
  templateUrl: './users-dashboard.component.html',
  styleUrls: ['./users-dashboard.component.scss'],
  providers: [UserService]
})
export class UsersDashboardComponent implements OnInit {


  columns = [
    {
      prop: 'expedient_number',
      name: 'Id'
    }
    , {
      prop: 'name',
      name: 'Nombre'
    }
    , {
      prop: 'surname',
      name: 'Apellido'
    }
    , {
      prop: 'mail',
      name: "Mail"
    }
    , {
      prop: 'is_visible',
      name: "Visible"
    }
  ];

  rows = [];
  temp = [];

  constructor(
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.setUsers();
  }

  setUsers(): void {
    this.userService.getUsers().subscribe(
      result => {
        if (result.status === 'success') {
          this.rows = result.data;
          this.temp = result.data;
        }
      }
    );
  }

  editUser(idUser): void{
    this.router.navigate(['pages/user-edit'],{
      queryParams: {
        id:idUser
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

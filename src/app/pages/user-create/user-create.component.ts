import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { RoleService } from "src/services/role/role.service";
import { UserService } from "src/services/user/user.service";
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { NbDialogService, NbDialogConfig } from '@nebular/theme';
import { NbAccessChecker } from '@nebular/security';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.scss'],
  providers: [RoleService]
})
export class UserCreateComponent implements OnInit {

  roles: Role[];
  roleId: Number;
  user: User;
  header:String = '';
  body:String = '';

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private dialogService: NbDialogService,
    public accessChecker: NbAccessChecker
  ) { }

  ngOnInit(): void {
    this.setRoles();
    this.user = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    this.roleId = 0;
  }

  setRoles(): void {
    this.roleService.getRoles().subscribe(
      result => {
        if (result.status === 'success') {
          this.roles = result.data;
        } 
      }
    );
  }

  create(dialog: TemplateRef<any>) {

    this.roles.forEach(role => {
      if (role.id == this.roleId) {
        this.user.role = role;
      }
    });

    this.user.is_visible = true;
    this.userService.createUser(this.user).subscribe(
      result => {
        if (result.status === 'success') {
          this.header ="Éxito";
          this.body = "El usuario se ha creado exitosamente";
          this.open(dialog);
          this.router.navigate(['pages/user-dashboard'])
        }
        else if (result.status === 'error' && result.error.code == "23505") {
          this.header ="Error";
          this.body = "Ya existe un usuario con ese numero de expediente";
          this.open(dialog);
        }
      }
    )
  }

  open(dialog: TemplateRef<any>) {
    this.dialogService.open(dialog, {});
  }

  cancel() {
    this.router.navigate(['pages/user-dashboard'])
  }
}

import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RoleService } from "src/services/role/role.service";
import { UserService } from "src/services/user/user.service";
import { Role } from 'src/app/models/role';
import { User } from 'src/app/models/user';
import { NbDialogService, NbDialogConfig } from '@nebular/theme';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
  providers:[RoleService]
})
export class UserEditComponent implements OnInit {

  roles: Role[];
  roleId: Number = 0;
  roleName: String = '';
  user: User;
  header:String = '';
  body:String = '';

  constructor(
    private roleService: RoleService,
    private userService: UserService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private dialogService: NbDialogService
  ) { }

  ngOnInit(): void {
    this.user = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
    var userId = this.activeRoute.snapshot.queryParams.id;
    this.setUser(userId);   
    this.setRoles();
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

  setUser(id): void {
    this.userService.getUserInformation(id).subscribe(
      result => {
        if (result.status === 'success') {
          this.user = result.data;
          this.roleId = this.user.role.id;
          this.roleName = this.user.role.name;
        }
      }
    );
  }

  edit(dialog: TemplateRef<any>) {

    this.roles.forEach(role => {
      if (role.id == this.roleId) {
        this.user.role = role;
      }
    });

    this.userService.editUser(this.user).subscribe(
      result => {
        if (result.status === 'success') {
          this.header ="Éxito";
          this.body = "El usuario se ha editado exitosamente";
          this.open(dialog);
          this.router.navigate(['/user-dashboard'])
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
    this.router.navigate(['/user-dashboard'])
  }

}

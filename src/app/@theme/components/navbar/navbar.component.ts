import { Component, OnInit } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { User } from '../../../models/user';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  sessionUser: User = new User(undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined);
  userMenu = [{ title: 'Log out' }];

  constructor(private authService: NbAuthService
    , private nbMenuService: NbMenuService
    , private router: Router) {

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.sessionUser = token.getPayload();
        }
      });
  }

  clearToken() {
    this.authService.logout('email').subscribe(response =>{
      console.log(response);
    })
  }

  ngOnInit(): void {
    this.nbMenuService.onItemClick()
      .pipe(
        filter(({ tag }) => tag === 'user-context-menu'),
        map(({ item: { title } }) => title),
      )
      .subscribe(title => {
        if (title === 'Log out') {
          this.clearToken();
          this.router.navigate(['auth/login']);
        }
      });
  }
}


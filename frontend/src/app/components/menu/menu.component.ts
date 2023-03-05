import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    private router: Router,
    private _authService: AuthService,
    private taost: ToastrService
  ) { }

  activeNav: string;

  ngOnInit(): void {
    this.router.navigate(['home']);
  }

  logout() {
    this.router.navigate(['login']);
    this._authService.logout();
    this.taost.info("Logout realizado com sucesso!", "Logout", { timeOut: 7000 });
  }

  setActive(navItem: string) {
    let oldActive = document.getElementById(this.activeNav);
    if (this.activeNav) {
      oldActive.classList.remove("active");
    }
    this.activeNav = navItem;
    let newActiveTab = document.getElementById(this.activeNav);
    newActiveTab.classList.add("active");
  }

}

import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore/firestore.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public displayName: string;

  constructor(
    public fireService: FirestoreService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.fireService.currentUser.subscribe((user: any) => {
      if (user) {
        this.displayName = user.displayName;
      }
    });
  }

  public logout() {
    this.fireService.logout();
    this.router.navigate(['/signin']);
  }

}

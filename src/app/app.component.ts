import { Component,HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  ngOnInit() {
  }
  ngOnDestroy() {
    sessionStorage.removeItem('currentUser');
    sessionStorage.clear();

  }
}

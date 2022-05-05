import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-os-create',
  templateUrl: './os-create.component.html',
  styleUrls: ['./os-create.component.css']
})
export class OsCreateComponent implements OnInit {

  @Input() osDetails = { os_name: '', type: ''}

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addOs() {
    this.restApi.createOs(this.osDetails).subscribe((data: {}) => {
      this.router.navigate(['/master-list'])
    })
  }

}
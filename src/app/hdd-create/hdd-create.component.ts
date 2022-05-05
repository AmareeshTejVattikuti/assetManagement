import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-hdd-create',
  templateUrl: './hdd-create.component.html',
  styleUrls: ['./hdd-create.component.css']
})
export class HddCreateComponent implements OnInit {

  @Input() hddDetails = { hdd_size: '', type: ''}

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addHdd() {
    this.restApi.createHdd(this.hddDetails).subscribe((data: {}) => {
      this.router.navigate(['/master-list'])
    })
  }

}
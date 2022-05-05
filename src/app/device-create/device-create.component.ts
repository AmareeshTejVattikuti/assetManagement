import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-device-create',
  templateUrl: './device-create.component.html',
  styleUrls: ['./device-create.component.css']
})
export class DeviceCreateComponent implements OnInit {

  @Input() deviceDetails = { device_type_name: ''}

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addDevice() {
    this.restApi.createDevice(this.deviceDetails).subscribe((data: {}) => {
      this.router.navigate(['/master-list'])
    })
  }

}
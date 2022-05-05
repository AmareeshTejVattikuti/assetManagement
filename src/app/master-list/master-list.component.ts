import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-master-list',
  templateUrl: './master-list.component.html',
  styleUrls: ['./master-list.component.css']
})
export class MasterListComponent implements OnInit {

  Master: any = {};
  device = [];
  hdd = [];
  os = [];
  department = [];
  ram = [];

  constructor(
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    return this.restApi.getMasterList().subscribe((data: {}) => {
      this.Master = data;
      this.device = this.Master["device_master"];
      this.os = this.Master["os_master"];
      this.ram = this.Master["ram_master"];
      this.hdd = this.Master["hdd_master"];
      this.department = this.Master["department_master"];
      console.log("device is "+JSON.stringify(this.device));
      console.log("department is "+JSON.stringify(this.department));
      console.log("os is "+JSON.stringify(this.os));
      console.log("ram is "+JSON.stringify(this.ram));
      console.log("hdd is "+JSON.stringify(this.hdd));
    })
  }

  
  

}
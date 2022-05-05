import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-view',
  templateUrl: './inventory-view.component.html',
  styleUrls: ['./inventory-view.component.css']
})
export class InventoryViewComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];

  Inventory: any = [];
  device: any = [];
  constructor(
    public restApi: RestApiService,
    public datepipe: DatePipe,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.restApi.getInvent(this.id).subscribe((data: {}) => {
      this.Inventory = data[0];
        this.Inventory.warranty_date = this.Inventory.warranty_date*1000;
        this.Inventory.purchased_date = this.Inventory.purchased_date*1000;
        this.Inventory.warranty_date = this.datepipe.transform(this.Inventory.warranty_date, 'yyyy-MM-dd');
        this.Inventory.purchased_date = this.datepipe.transform(this.Inventory.purchased_date, 'yyyy-MM-dd');
    })
        this.restApi.getDeviceStats(this.id).subscribe((data: {}) => {
        this.device = data;
        for(let dev of this.device){ 
        dev.start_date = dev.start_date*1000;
        dev.end_date = dev.end_date*1000;
        dev.start_date = this.datepipe.transform(dev.start_date, 'yyyy-MM-dd');
        dev.end_date = this.datepipe.transform(dev.end_date, 'yyyy-MM-dd');
        } 
      })
    }
  }
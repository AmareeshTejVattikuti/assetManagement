import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-inventory-details',
  templateUrl: './inventory-edit.component.html',
  styleUrls: ['./inventory-edit.component.css'],
  providers: [DatePipe]
})

export class InventoryEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  inventoryData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public datepipe: DatePipe
  ) { 
  }

  ngOnInit() { 
    console.log("id value is"+ this.id)
    this.restApi.getInventory(this.id).subscribe((data: {}) => {
      this.inventoryData = data[0];
      this.inventoryData.warranty_date = this.datepipe.transform(this.inventoryData.warranty_date*1000, 'yyyy-MM-dd');
      this.inventoryData.purchased_date = this.datepipe.transform(this.inventoryData.purchased_date*1000, 'yyyy-MM-dd');
      console.log(JSON.stringify(data))
    })
  }

  // Update inventory data
  updateInventory() {
    var warranty_date = Date.parse(this.inventoryData.warranty_date);
    var purchased_date = Date.parse(this.inventoryData.purchased_date);
    warranty_date = warranty_date/1000;
    purchased_date = purchased_date/1000;
    this.inventoryData.warranty_date = warranty_date.toString();
    this.inventoryData.purchased_date = purchased_date.toString();
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateInventory(this.inventoryData).subscribe(data => {
        this.router.navigate(['/inventory-list'])
      })
    }
  }

}
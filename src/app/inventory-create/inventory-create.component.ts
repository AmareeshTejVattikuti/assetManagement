import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-inventory-create',
  templateUrl: './inventory-create.component.html',
  styleUrls: ['./inventory-create.component.css']
})
export class InventoryCreateComponent implements OnInit {
  
  @Input() inventoryDetails = { device_name: '', device_type_id: '', serial_no: '', model: '', ram_id: '',
     hdd_id: '', processor: '', os_id: '', warranty_date:'', purchased_date:'', description: '',
     repair: '' }

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addInventory() {
    var warranty_date = Date.parse(this.inventoryDetails.warranty_date);
    var purchased_date = Date.parse(this.inventoryDetails.purchased_date);
    warranty_date = warranty_date/1000;
    purchased_date = purchased_date/1000;
    this.inventoryDetails.warranty_date = warranty_date.toString();
    this.inventoryDetails.purchased_date = purchased_date.toString();
    console.log("inventory details are "+JSON.stringify(this.inventoryDetails));
    if(window.confirm('Are you sure, you want to add this inventory?')){
    this.restApi.createInventory(this.inventoryDetails).subscribe((data: {}) => {
      this.router.navigate(['/inventory-list'])
    })
   }
  }

}
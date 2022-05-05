import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inventory-list',
  templateUrl: './inventory-list.component.html',
  styleUrls: ['./inventory-list.component.css']
})
export class InventoryListComponent implements OnInit {

  Inventory: any = [];
  UnasInv: any =[];
  term: string;

  constructor(
    public restApi: RestApiService,
    public datepipe: DatePipe,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { }

  ngOnInit() {
    this.loadInventories()
    
  }

  // Get Inventory list
  loadInventories() {
    this.restApi.getInventories().subscribe((data: {}) => {
      this.Inventory = data;
      this.Inventory.sort((a,b) => (a.device_name > b.device_name) ? 1 : ((b.device_name > a.device_name) ? -1 : 0));
      for(let inv of this.Inventory){
        inv.warranty_date = inv.warranty_date*1000;
        inv.purchased_date = inv.purchased_date*1000;
        inv.warranty_date = this.datepipe.transform(inv.warranty_date, 'yyyy-MM-dd');
      inv.purchased_date = this.datepipe.transform(inv.purchased_date, 'yyyy-MM-dd');
      }
    })
    this.restApi.getUnasInv().subscribe((data: {}) => {
      this.UnasInv = data;
    })
  }

  //reload the page
  reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/inventory-list']);
 }
  // Delete Inventory
  delInventory(id) {
    if (window.confirm('Are you sure, you want to delete?')){
      this.restApi.deleteInventory(id).subscribe(data => {
        this.reload()
      })
    }
  } 
  
  //Download Employee report
  download() {
    let fileName = 'InventoryReport.csv';
    let columnNames = [ "Inventory ID", "Device Name", "Device Type Id", "Serial No","Model","RAM ID","HDD ID","Processor","OS ID","Warranty Date","Purchase Date","Description","Repair","Active","Device Type Name","RAM Size","HDD Size","OS Name","Asset Status"];
    let header = columnNames.join(',');
    
    let csv = header;
    csv += '\r\n';
    this.loadInventories()
    this.Inventory.map(c => {
      csv += [c["id"], c["device_name"], c["device_type_id"], c["serial_no"],c["model"],c["ram_id"],c["hdd_id"],c["processor"],c["os_id"],c["warranty_date"],c["purchased_date"],c["description"],c["repair"],c["is_active"],c["device_type_name"],c["ram_size"],c["hdd_size"],c["os_name"],c["asset_status"]].join(',');
      csv += '\r\n';
    })

    var blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });

    var link = document.createElement("a");
    if (link.download !== undefined) {
      var url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

}
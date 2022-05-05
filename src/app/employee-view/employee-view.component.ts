import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],

})

export class EmployeeViewComponent implements OnInit {
  term: string;
  id = this.actRoute.snapshot.params['id'];
  id2 = this.actRoute.snapshot.params['id2'];
  employeeData: any = {};
  employee:any = [];
  Inventory: any = [];
  assetData: any = [];
  disabled = false;
  ShowFilter = false;
  limitSelection = false;
  inventoryData: any = {};
  dropdownSettings:IDropdownSettings = {};
  selectedItems = [];

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit() {
    this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data[0];
      this.employeeData.date_of_joining = this.employeeData.date_of_joining*1000;
      this.employeeData.date_of_joining = this.datepipe.transform(this.employeeData.date_of_joining, 'yyyy-MM-dd');
    })
    this.restApi.getEmployees().subscribe((data: {}) => {
      this.employee = data;
    })
    this.getUnassignedAsset()
    this.selectedItems = [];
    this.dropdownSettings = {
        singleSelection: false,
        idField: 'id',
        textField: 'device_name',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 5,
        allowSearchFilter: true,
        enableCheckAll: false,
        noDataAvailablePlaceholderText: 'No Assets available'
    };
   this.getEmpAssets()

  }

  // get unassigned assets
  getUnassignedAsset() {
  this.restApi.getyetToAssignInv().subscribe((data: {}) => {
    this.Inventory = data;
    for(let inv of this.Inventory){
    inv.warranty_date = inv.warranty_date*1000;
    inv.purchased_date = inv.purchased_date*1000;
    inv.warranty_date = this.datepipe.transform(inv.warranty_date, 'yyyy-MM-dd');
    inv.purchased_date = this.datepipe.transform(inv.purchased_date, 'yyyy-MM-dd');
    }
  })
}

  //get employee assets
  getEmpAssets() {
    this.restApi.getEmployeeAsset(this.id2).subscribe((data: {}) => {
      this.assetData = data;
      for(let asset of this.assetData){
        asset.warranty_date = asset.warranty_date*1000;
        asset.purchased_date = asset.purchased_date*1000;
        asset.warranty_date = this.datepipe.transform(asset.warranty_date, 'yyyy-MM-dd');
        asset.purchased_date = this.datepipe.transform(asset.purchased_date, 'yyyy-MM-dd');
        }
  })
 }

 //reload the employee edit page
 reload() {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['/employee-view/'+this.id+'/'+this.id2]);
 }


 //remove employee inventory
 removeEmpInv(astid,astname,empid){
  if(window.confirm('Are you sure, you want to remove following asset '+astname+' from '+empid+' ?')){
    this.restApi.deleteEmpInvMap(this.id2, astid).subscribe(data => {
      })
    }
    window.location.reload();
 }

//reassign to another employee
updateEIM(empid,astid,device,empp ){
  if(window.confirm('Are you sure, you want to reassign following asset '+device+' '+astid+' to '+empp+' from '+empid+'?')){
    this.restApi.deleteEmpInvMap(this.id2, astid).subscribe(data => {
    })
     this.restApi.updateEmpInvMap(empid, astid).subscribe(data => {
      window.location.reload();
    })
  }
}

 onItemSelect(item: any) {
  if(window.confirm('Are you sure, you want to Assign following asset ' +item.device_name+ ' to employee ' + this.id+' ?')){
    this.restApi.updateEmpInvMap(this.id2, item.id).subscribe(data => {
    this.reload();
    })
  }
    this.reload();
  }
  onSelectAll(items: any) {
    console.log('onSelectAll', items);
  }
  toogleShowFilter() {
    this.ShowFilter = !this.ShowFilter;
    this.dropdownSettings = Object.assign({}, this.dropdownSettings, { allowSearchFilter: this.ShowFilter });
}

handleLimitSelection() {
    if (this.limitSelection) {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: 2 });
    } else {
        this.dropdownSettings = Object.assign({}, this.dropdownSettings, { limitSelection: null });
    }
}
}

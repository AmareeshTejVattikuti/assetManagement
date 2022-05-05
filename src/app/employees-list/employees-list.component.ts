import { Component, OnInit } from '@angular/core';
import { RestApiService } from "../shared/rest-api.service";
import { Observable, forkJoin } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  term: string;
  Employee: any = [];
  assets: any = [];
  reportData: any = [];

  constructor(
    public datepipe: DatePipe,
    public restApi: RestApiService
  ) { }

  ngOnInit() {
    this.loadEmployees()
  }

  // Get employees list
  loadEmployees() {
    this.restApi.getEmployees().subscribe((data: {}) => {
      this.Employee = data;
      this.Employee.sort((a,b) => (a.email > b.email) ? 1 : ((b.email > a.email) ? -1 : 0));
      for(let emp of this.Employee){
        emp.date_of_joining = emp.date_of_joining*1000;
        emp.date_of_joining = this.datepipe.transform(emp.date_of_joining, 'yyyy-MM-dd');
        emp.designation = emp.designation.replace(",", " & ")
        this.restApi.getEmployeeAsset(emp.id).subscribe((data: {}) => {
          this.assets = data;
          if(this.assets.length !== 0){
            for(let asset of this.assets){
              asset.warranty_date = asset.warranty_date*1000;
              asset.purchased_date = asset.purchased_date*1000;
              asset.warranty_date = this.datepipe.transform(asset.warranty_date, 'yyyy-MM-dd');
              asset.purchased_date = this.datepipe.transform(asset.purchased_date, 'yyyy-MM-dd');
              this.reportData.push({"eid": emp.id,"employeeId":emp.employee_id,"gsId":emp.gs_id,"name":emp.name,"email":emp.email,
              "departmentId":emp.department_id,"designation":emp.designation,"supervisor":emp.supervisor,"doj":emp.date_of_joining,"empType":emp.employment_type,"eActive":emp.is_active,"invId":asset.id,"deviceName":asset.device_name,
              "deviceTypeId":asset.device_type_id,"deviceTypeName":asset.device_type_name,"serialNo":asset.serial_no,"model":asset.model,"processor":asset.processor,
              "ramId":asset.ram_id,"hddId":asset.hdd_id,"osId":asset.os_id,"warrantyDate":asset.warranty_date,"purchaseDate":asset.purchased_date,
              "description":asset.description,"repair":asset.repair,"invActive":asset.is_active,"ramSize":asset.ram_size,"hddSize":asset.hdd_size,
              "osName":asset.os_name,"assetStatus":asset.asset_status})
            }
          }
          else {
              this.reportData.push({"eid": emp.id,"employeeId":emp.employee_id,"gsId":emp.gs_id,"name":emp.name,"email":emp.email,
              "departmentId":emp.department_id,"designation":emp.designation,"supervisor":emp.supervisor,"doj":emp.date_of_joining,"empType":emp.employment_type,"eActive":emp.is_active})
          }
        })
      }
    })
  }

  // Delete employee
  deleteEmployee(employee_id,eid) {
    if (window.confirm('Are you sure, you want to delete '+employee_id+' with ID '+eid)){
      this.restApi.deleteEmployee(employee_id,eid).subscribe(data => {
        this.loadEmployees()
      })
    }
  }

  //Download Employee report
  download() {
    let fileName = 'EmployeeReport.csv';
    let columnNames = ["ID", "User ID", "Employee ID", "Name", "Email","Department ID","Designation","Supervisor","Date Of Joining","Employment Type",
    "Emp Active","Inventory ID","Device Name","Device Type ID","Device Type Name","Serial No","Model","Processor",
    "RAM ID","HDD ID","OS ID","Warranty Date","Purchase Date","Description","Repair","Inv Active","RAM Size","HDD Size","OS Name","Asset Status"];
    let header = columnNames.join(',');
    let csv = header;
    csv += '\r\n';
    console.log("Report data is"+JSON.stringify(this.reportData))
    this.reportData.map(c => {
      csv += [c["eid"], c["employeeId"],c["gsId"], c["name"],c["email"],c["departmentId"],c["designation"],c["supervisor"],c["doj"],c["empType"],c["eActive"],
      c["invId"],c["deviceName"],c["deviceTypeId"],c["deviceTypeName"],c["serialNo"],c["model"],c["processor"],c["ramId"],
    c["hddId"],c["osId"],c["warrantyDate"],c["purchaseDate"],c["description"],c["repair"],c["invActive"],c["ramSize"],c["hddSize"],
  c["osName"],c["assetStatus"]].join(',');
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

import { Component, OnInit } from '@angular/core';
import { RestApiService } from '../shared/rest-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})

export class EmployeeEditComponent implements OnInit {
  id = this.actRoute.snapshot.params['id'];
  employeeData: any = {};

  constructor(
    public restApi: RestApiService,
    public actRoute: ActivatedRoute,
    public router: Router,
    public datepipe: DatePipe
  ) {
  }

  ngOnInit() {
    console.log("id value is"+ this.id)
    this.restApi.getEmployee(this.id).subscribe((data: {}) => {
      this.employeeData = data[0];
      this.employeeData.date_of_joining = this.employeeData.date_of_joining*1000;
      this.employeeData.date_of_joining = this.datepipe.transform(this.employeeData.date_of_joining, 'yyyy-MM-dd');
    })
  }


  // Update employee data
  updateEmployee() {
    var date_of_joining = Date.parse(this.employeeData.date_of_joining);
    date_of_joining = date_of_joining/1000;
    this.employeeData.date_of_joining = date_of_joining.toString();
    if(window.confirm('Are you sure, you want to update?')){
      this.restApi.updateEmployee(this.employeeData).subscribe(data => {
        this.router.navigate(['/employees-list'])
      })
    }
  }

}

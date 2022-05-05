import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css']
})
export class EmployeeCreateComponent implements OnInit {

  @Input() employeeDetails = { employee_id: '', gs_id: '', email: '', name: '', first_name: '', last_name: '', department_id: '', designation: '', supervisor: '', date_of_joining: '', employment_type: ''}
  Master: any = {};
  department = [];

  constructor(
    public restApi: RestApiService,
    public router: Router
  ) { }

  ngOnInit() {
    return this.restApi.getMasterList().subscribe((data: {}) => {
      this.Master = data;
      this.department = this.Master["department_master"];

    })
  }

  selectedEvent(event: any) {
      console.log('the selected value is ' + event.target.value)
      this.employeeDetails["department_id"] = event.target.value;
  }

  addEmployee() {
    var date_of_joining = Date.parse(this.employeeDetails.date_of_joining);
    date_of_joining = date_of_joining/1000;
    this.employeeDetails.date_of_joining = date_of_joining.toString();
    this.restApi.createEmployee(this.employeeDetails).subscribe((data: {}) => {
      this.router.navigate(['/employees-list'])
    })
  }
}

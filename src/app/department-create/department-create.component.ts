import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-department-create',
  templateUrl: './department-create.component.html',
  styleUrls: ['./department-create.component.css']
})
export class DepartmentCreateComponent implements OnInit {

  @Input() departmentDetails = { department_name: ''}

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addDepartment() {
    this.restApi.createDepartment(this.departmentDetails).subscribe((data: {}) => {
      this.router.navigate(['/master-list'])
    })
  }

}
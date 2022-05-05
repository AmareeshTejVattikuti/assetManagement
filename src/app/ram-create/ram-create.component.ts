import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from "../shared/rest-api.service";

@Component({
  selector: 'app-ram-create',
  templateUrl: './ram-create.component.html',
  styleUrls: ['./ram-create.component.css']
})
export class RamCreateComponent implements OnInit {

  @Input() ramDetails = { ram_size: '', type: ''}

  constructor(
    public restApi: RestApiService, 
    public router: Router
  ) { }

  ngOnInit() { }

  addRam() {
    this.restApi.createRam(this.ramDetails).subscribe((data: {}) => {
      this.router.navigate(['/master-list'])
    })
  }

}
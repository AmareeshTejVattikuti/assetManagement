import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from './guard/index';
import { UserService } from './services/user.service';
import { ToastrModule } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

// HttpClient module for RESTful API
import { HttpClientModule } from '@angular/common/http';

// Routing module for router service
import { AppRoutingModule } from './app-routing.module';

// Forms module
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

// for search functionality
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//Multi selectDropdown module
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//slim loading bar
import { SlimLoadingBarModule } from 'ng2-slim-loading-bar';

// Components
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { RamCreateComponent } from './ram-create/ram-create.component';
import { HddCreateComponent } from './hdd-create/hdd-create.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { OsCreateComponent } from './os-create/os-create.component';
import { DatePipe } from '@angular/common';
import { MasterListComponent } from './master-list/master-list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import {LoginComponent} from './login/login.component'


@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent,
    EmployeesListComponent,
    InventoryListComponent,
    InventoryEditComponent,
    InventoryCreateComponent,
    InventoryViewComponent,
    DepartmentCreateComponent,
    RamCreateComponent,
    HddCreateComponent,
    DeviceCreateComponent,
    OsCreateComponent,
    EmployeeViewComponent,
    MasterListComponent,
    HomeComponent,
    LoginComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule,
    Ng2SearchPipeModule,
    SlimLoadingBarModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [DatePipe,AuthGuard,UserService,CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
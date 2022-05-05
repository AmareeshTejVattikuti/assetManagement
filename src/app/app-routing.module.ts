import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { EmployeeCreateComponent } from './employee-create/employee-create.component';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeesListComponent } from './employees-list/employees-list.component';
import { EmployeeViewComponent } from './employee-view/employee-view.component';
import { InventoryListComponent } from './inventory-list/inventory-list.component';
import { InventoryViewComponent } from './inventory-view/inventory-view.component';
import { InventoryEditComponent } from './inventory-edit/inventory-edit.component';
import { InventoryCreateComponent } from './inventory-create/inventory-create.component';
import { DepartmentCreateComponent } from './department-create/department-create.component';
import { RamCreateComponent } from './ram-create/ram-create.component';
import { HddCreateComponent } from './hdd-create/hdd-create.component';
import { DeviceCreateComponent } from './device-create/device-create.component';
import { OsCreateComponent } from './os-create/os-create.component';
import { MasterListComponent } from './master-list/master-list.component';
import { HomeComponent } from './home/home.component';
import{ LoginComponent } from './login/login.component';




const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  {path: 'login', component: LoginComponent },
  {path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'create-employee', component: EmployeeCreateComponent,canActivate: [AuthGuard] },
  { path: 'employees-list', component: EmployeesListComponent,canActivate: [AuthGuard] },
  { path: 'employee-edit/:id', component: EmployeeEditComponent,canActivate: [AuthGuard] },
  { path: 'inventory-list', component: InventoryListComponent,canActivate: [AuthGuard] },
  { path: 'inventory-view/:id', component: InventoryViewComponent,canActivate: [AuthGuard] },  
  { path: 'inventory-edit/:id', component: InventoryEditComponent,canActivate: [AuthGuard] },
  {path: 'create-inventory', component: InventoryCreateComponent,canActivate: [AuthGuard]},
  {path: 'create-department', component: DepartmentCreateComponent,canActivate: [AuthGuard]},
  {path: 'create-ram', component: RamCreateComponent,canActivate: [AuthGuard]},
  {path: 'create-hdd', component: HddCreateComponent,canActivate: [AuthGuard]},
  {path: 'create-device', component: DeviceCreateComponent,canActivate: [AuthGuard]},
  {path: 'create-os', component: OsCreateComponent,canActivate: [AuthGuard]},
  {path: 'employee-view/:id/:id2', component: EmployeeViewComponent,canActivate: [AuthGuard]},
  {path: 'master-list', component: MasterListComponent,canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
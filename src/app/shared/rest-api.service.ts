import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpParams } from '@angular/common/http';
import { Employee } from '../shared/employee';
import { Inventory } from '../shared/inventory';
import { EmpInv } from '../shared/inventory';
import { Department } from '../shared/department';
import { Ram } from '../shared/ram';
import { Hdd } from '../shared/hdd';
import { Device, DeviceStats } from '../shared/device';
import { Os } from '../shared/os';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../shared/user';


@Injectable({
  providedIn: 'root'
})

export class RestApiService {
  
  // Define API
  apiURL = 'http://gs1-pocjava-dx:8086';

  constructor(private http: HttpClient) { }

  /*========================================
    CRUD Methods for consuming RESTful API
  =========================================*/

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }  

  // HttpClient API get() method => Fetch employees list
  getEmployees(): Observable<Employee> {
    return this.http.get<Employee>(this.apiURL + '/employee?user_id=1')
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API get() method => Fetch employee
  getEmployee(id): Observable<Employee> {
    return this.http.get<Employee>(`${this.apiURL}/get_employee?employee_id=`+id)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API post() method => Create employee
  createEmployee(employee): Observable<Employee> {
    employee["user_id"] = "1";
    return this.http.post<Employee>(this.apiURL + '/create_employee', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }  

  // HttpClient API put() method => Update employee
  updateEmployee(employee): Observable<Employee> {
    employee["user_id"] = "1";
    return this.http.post<Employee>(this.apiURL + '/update_employee/', JSON.stringify(employee), this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  // HttpClient API delete() method => Delete employee
  deleteEmployee(employee_id,eid){
    const del = {
      "employee_id": employee_id,
      "id": eid,
      "user_id": 1
    };
    return this.http.post<Employee>(this.apiURL + '/delete_employee', JSON.stringify(del) , this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

// HttpClient API get() method => Fetch Inventory list
getInventories(): Observable<Inventory> {
  return this.http.get<Inventory>(this.apiURL + '/inventory?user_id=1&tracking=true')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API get() method => Fetch Inventory list
getUnasInv(): Observable<Inventory> {
  return this.http.get<Inventory>(this.apiURL + '/inventory?user_id=1')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API get() method => Fetch Inventory list
getInvent(id): Observable<Inventory> {
  return this.http.get<Inventory>(this.apiURL + '/get_inventory?user_id=1&id='+id)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

//HttpClient API get() method => Fetch Device Stats/history
getDeviceStats(id): Observable<DeviceStats> {
  return this.http.get<DeviceStats>(this.apiURL + '/device_stats?user_id=1&inventory_id='+id)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


// HttpClient API get() method => Fetch Inventory list
getyetToAssignInv(): Observable<Inventory> {
  return this.http.get<Inventory>(this.apiURL + '/inventory?user_id=1&tracking=false')
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API get() method => Fetch Inventory
getInventory(id): Observable<Inventory> {
  return this.http.get<Inventory>(`${this.apiURL}/get_inventory?user_id=1&id=`+id)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API post() method => Create Inventory
createInventory(inventory): Observable<Inventory> {
  inventory["user_id"] = "1";
  console.log(JSON.stringify(inventory));
  return this.http.post<Inventory>(this.apiURL + '/create_inventory', JSON.stringify(inventory), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API put() method => Update Inventory
updateInventory(inventory): Observable<Inventory> {
  inventory["user_id"] = "1";
  return this.http.post<Inventory>(this.apiURL + '/update_inventory', JSON.stringify(inventory), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API delete() method => Delete Inventory
deleteInventory(inventory_id){
  const del = {
    "inventory_id": inventory_id,
    "user_id": 1
  };
  return this.http.post<Inventory>(this.apiURL + '/delete_inventory', JSON.stringify(del) , this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API post() method => Create Department
createDepartment(department): Observable<Department> {
  return this.http.post<Department>(this.apiURL + '/insert_department', JSON.stringify(department), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API post() method => Add RAM details
createRam(ram): Observable<Ram> {
  return this.http.post<Ram>(this.apiURL + '/insert_ram', JSON.stringify(ram), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API post() method => Add HDD details
createHdd(hdd): Observable<Hdd> {
  return this.http.post<Hdd>(this.apiURL + '/insert_hdd', JSON.stringify(hdd), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API post() method => Add OS details
createOs(os): Observable<Os> {
  return this.http.post<Os>(this.apiURL + '/insert_os', JSON.stringify(os), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API post() method => Add Device details
createDevice(device): Observable<Device> {
  return this.http.post<Device>(this.apiURL + '/insert_device', JSON.stringify(device), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}  

// HttpClient API get() method => Fetch employee Assets
getEmployeeAsset(id2): Observable<Inventory> {
  return this.http.get<Inventory>(`${this.apiURL}/emp_device?user_id=1&employee_id=`+id2)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
} 

//httpClient API get() method => get master list
getMasterList(): Observable<any> {
  return this.http.get<any>(`${this.apiURL}/master`)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
} 

//httpclient API POST() method to login
login(username, password): Observable<User>{
  const user = {
    "email":username,
    "password":password
  }
  return this.http.post<User>(this.apiURL + '/login', JSON.stringify(user), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}


// HttpClient API post() method => Create Emp Inv Map
updateEmpInvMap(employee_id,item_id): Observable<EmpInv> {
  const empinv = {
    "employee_id": employee_id,
    "inventory_id" : item_id,
    "user_id": 1
  }
 return this.http.post<EmpInv>(this.apiURL + '/create_inventory_map', JSON.stringify(empinv), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

// HttpClient API post() method => delete Emp Inv Map
deleteEmpInvMap(employee_id,item_id): Observable<EmpInv> {
  const empinv = {
    "employee_id": employee_id,
    "inventory_id" : item_id,
    "user_id": 1
  }
 return this.http.post<EmpInv>(this.apiURL + '/delete_inventory_map', JSON.stringify(empinv), this.httpOptions)
  .pipe(
    retry(1),
    catchError(this.handleError)
  )
}

  // Error handling 
  handleError(error) {
     let errorMessage = '';
     if(error.error instanceof ErrorEvent) {
       // Get client-side error
       errorMessage = error.error.message;
     } else {
       // Get server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
     }
     window.alert(errorMessage);
     return throwError(errorMessage);
  }

}
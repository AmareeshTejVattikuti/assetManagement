import { DatePipe } from '@angular/common';

export class Inventory {
        "id": number;
        "device_name": string;
        "device_type_id": number;
        "serial_no": string;
        "model": string;
        "ram_id": number;
        "hdd_id": number;
        "processor": string;
        "os_id": number;
        "warranty_date": Date;
        "purchased_date": Date;
        "description": string;
        "repair": string;
        "is_active": boolean;
        "device_type_name":string;
        "ram_size": string;
        "hdd_size": string;
        "os_name": string;
        "asset_status": string;
 }

 export class EmpInv {
     "employee_id": number;
     "inventory_id": number;
     "user_id": number    
 }
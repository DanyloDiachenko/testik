import { Employee } from "./employee.interface";

export interface Shop {
    name: string;
    shopId: string;
    children: Employee[];
}

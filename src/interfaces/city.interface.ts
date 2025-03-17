import { Shop } from "./shop.interface";

export interface City {
    name: string;
    cityId: string;
    children: Shop[];
}

import { Item } from "../types/Item.ts";
import api from "../utils/api.ts";

export class ItemService {
  static getList(): Promise<Item[]> {
    return api.get("item-transactions").json();
  }
}

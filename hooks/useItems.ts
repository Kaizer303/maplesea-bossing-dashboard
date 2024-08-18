import { useSignal } from "@preact/signals";
import { useEffect } from "preact/hooks";
import { Item } from "../types/Item.ts";
import { ItemService } from "@services";

export const useItems = () => {
  const items = useSignal<Item[]>([]);

  useEffect(() => {
    ItemService.getList().then((data) => {
      items.value = data;
    });
  }, []);

  return { items: items.value };
};

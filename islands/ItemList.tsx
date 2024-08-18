import { useItems } from "@hooks";
import { ItemComponent } from "../components/Item.tsx";

export default function ItemList() {
  const { items } = useItems();
  console.log("items: ", items);
  return <div>{items.map((item) => <ItemComponent item={item} />)}</div>;
}

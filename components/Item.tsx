import { Item } from "@types";

interface ItemComponentProps {
  item: Item;
}

export function ItemComponent(props: ItemComponentProps) {
  console.log("props.item: ", props.item);
  return (
    <div class="grid grid-cols-4">
      <p>{props.item.id}</p>
      <p>{props.item.itemName}</p>
      <p>{props.item.owner}</p>
      {/* <p>{props.item.members}</p> */}
      <p>{props.item.isSold}</p>
      <p>{props.item.price}</p>
      <p>{props.item.tax}</p>
      <p>{props.item.finalPrice}</p>
      <p>{props.item.pricePerPerson}</p>
      {/* <p>{props.item.transactionStatus}</p> */}
    </div>
  );
}

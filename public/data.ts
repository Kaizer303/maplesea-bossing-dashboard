import { ItemLog } from "~/components/services/item-logs.service";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Created At", uid: "created_at", sortable: true },
  { name: "Updated At", uid: "updated_at", sortable: true },
  { name: "Item Name", uid: "item_name", sortable: true },
  { name: "Final Price", uid: "final_price", sortable: true },
  { name: "Is Sold", uid: "is_sold", sortable: true },
  { name: "Members", uid: "members" },
  { name: "Owner", uid: "owner", sortable: true },
  { name: "Price", uid: "price", sortable: true },
  { name: "Price per Person", uid: "price_per_person", sortable: true },
  { name: "Tax", uid: "tax", sortable: true },
  { name: "Transaction Status", uid: "transaction_status" },
  { name: "Actions", uid: "actions" },
];

const users: ItemLog[] = [
  {
    created_at: "2023-07-01T00:00:00.000Z",
    final_price: 1,
    id: "item_transactions:lp9x9otnzg7jk1v88kvc",
    is_sold: true,
    item_name: "…",
    members: ["Chin"],
    owner: "Chin",
    price: 1,
    price_per_person: 1,
    tax: 1,
    transaction_status: [
      {
        is_paid: true,
        member: "Chin",
      },
    ],
    updated_at: "2023-07-01T00:00:00.000Z",
  },
];

export { columns, users };

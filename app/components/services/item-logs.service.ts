export const getItemLogs = async (): Promise<ItemLog[] | null> => {
  const res = await fetch(
    "https://maple-rs-production.up.railway.app/api/v1/item-transactions"
  );
  if (res) return res.json();
  else return null;
};

export interface ItemLog {
  id: string;
  created_at: string;
  final_price: number;
  is_sold: boolean;
  item_name: string;
  members: string[];
  owner: string;
  price: number;
  price_per_person: number;
  tax: number;
  transaction_status: TransactionStatus[];
  updated_at: string;
}

export interface TransactionStatus {
  is_paid: boolean;
  member: string;
}

export const instanceOfTransactionStatus = (
  object: any
): object is TransactionStatus => {
  return "is_paid" in object && "member" in object;
};

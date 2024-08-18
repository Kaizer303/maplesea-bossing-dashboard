export interface Item {
  id: string;
  owner: User;
  members: User[];
  itemName: string;
  isSold: boolean;
  price: number;
  tax: number;
  finalPrice: number;
  pricePerPerson: number;
  transactionStatus: TransactionStatus[];
}

export enum User {
  Chin = "Chin",
  Opal = "Opal",
  Ter = "Ter",
  Toon = "Toon",
}

export interface TransactionStatus {
  member: User;
  isPaid: boolean;
}

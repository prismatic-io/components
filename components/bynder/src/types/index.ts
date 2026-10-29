export interface PollState {
  itemsDone: string[];
  itemsFailed: string[];
  itemsRejected: string[];
}

export interface Collections {
  collections: Collection[];
  count: number;
}

export interface Collection {
  userId: string;
  dateModified: string;
  filename: string;
  dateCreated: string;
  collectionCount: number;
  id: string;
  name: string;
  cover: Cover;
  user: User;
  description: string;
  IsPublic: number;
}

export interface Cover {
  thumbnail: string;
  thumbnails: string[];
  large: string;
}

export interface User {
  id: string;
  name: string;
}

export type OrderStatus =
  | "IN_PROGRESS"
  | "CANCELED"
  | "FAILED"
  | "WAITING_FOR_PAYMENT"
  | "FOR_ORDER"
  | "IN_PRODUCTION"
  | "PRODUCTION_SUSPENDED"
  | "OUT_FOR_DELIVERY"
  | "FINISHED";

export type Records = Record<string, string | number>;

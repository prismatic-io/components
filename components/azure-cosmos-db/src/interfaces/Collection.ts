export interface Collection {
  id: string;
  partitionKey?: { paths: string[]; kind: string };
}

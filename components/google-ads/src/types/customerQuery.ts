export interface CustomerClientResult {
  customerClient: CustomerClientQuery;
}

export interface CustomerClientQuery {
  clientCustomer: string;
  level: string;
  manager: boolean;
  descriptiveName: string;
  id: string;
}

interface CustomerClientQuery {
  clientCustomer: string;
  level: string;
  manager: boolean;
  descriptiveName: string;
  id: string;
}
export interface CustomerClientResult {
  customerClient: CustomerClientQuery;
}

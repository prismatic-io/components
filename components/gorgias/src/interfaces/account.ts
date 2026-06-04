export interface GetAccountResponse {
  created_datetime: string;
  deactivated_datetime: string | null;
  domain: string;
  settings: {
    id: number;
    type: string;
    data: {
      timezone: string;
      business_hours: {
        days: string;
        from_time: string;
        to_time: string;
      };
    };
  }[];
  status: {
    status: string;
  };
}

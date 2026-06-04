




export const listCustomersExamplePayload = {
  data: [
    {
      Taxable: false,
      BillAddr: {
        Id: "30",
        Line1: "45612 Main St.",
        City: "Bayshore",
        CountrySubDivisionCode: "CA",
        PostalCode: "94326",
        Lat: "45.256574",
        Long: "-66.0943698",
      },
      ShipAddr: {
        Id: "30",
        Line1: "45612 Main St.",
        City: "Bayshore",
        CountrySubDivisionCode: "CA",
        PostalCode: "94326",
        Lat: "45.256574",
        Long: "-66.0943698",
      },
      Job: false,
      BillWithParent: false,
      Balance: 375,
      BalanceWithJobs: 375,
      CurrencyRef: {
        value: "USD",
        name: "United States Dollar",
      },
      PreferredDeliveryMethod: "Print",
      IsProject: false,
      ClientEntityId: "0",
      domain: "QBO",
      sparse: false,
      Id: "29",
      SyncToken: "0",
      MetaData: {
        CreateTime: "2022-04-19T17:29:04-07:00",
        LastUpdatedTime: "2022-04-25T11:09:08-07:00",
      },
      GivenName: "John",
      FamilyName: "Doe",
      FullyQualifiedName: "Test Consulting",
      CompanyName: "Test Consulting",
      DisplayName: "Test Consulting",
      PrintOnCheckName: "Test Consulting",
      Active: true,
      V4IDPseudonym: "002098a6974364ee434c6fa12125da1d76756e",
      PrimaryPhone: {
        FreeFormNumber: "(650) 555-1423",
      },
      PrimaryEmailAddr: {
        Address: "john.doe@example.com",
      },
    },
  ],
};

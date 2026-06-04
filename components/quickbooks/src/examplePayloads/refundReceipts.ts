




export const listRefundReceiptsExamplePayload = {
  data: [
    {
      DocNumber: "1020",
      SyncToken: "0",
      domain: "QBO",
      Balance: 0,
      PaymentMethodRef: {
        name: "Check",
        value: "2",
      },
      BillAddr: {
        Line4: "South Orange, NJ  07079",
        Line3: "350 Mountain View Dr.",
        Line2: "Pye's Cakes",
        Line1: "Karen Pye",
        Long: "-74.2609903",
        Lat: "40.7489277",
        Id: "73",
      },
      DepositToAccountRef: {
        name: "Checking",
        value: "35",
      },
      TxnDate: "2014-09-17",
      TotalAmt: 87.5,
      CustomerRef: {
        name: "Pye's Cakes",
        value: "15",
      },
      CustomerMemo: {
        value: "Thank you for your business and have a great day!",
      },
      PrintStatus: "NotSet",
      BillEmail: {
        Address: "pyescakes@intuit.com",
      },
      sparse: false,
      Line: [
        {
          Description: "Refund - Pest control was ineffective",
          DetailType: "SalesItemLineDetail",
          SalesItemLineDetail: {
            TaxCodeRef: {
              value: "NON",
            },
            Qty: 2.5,
            UnitPrice: 35,
            ItemRef: {
              name: "Pest Control",
              value: "10",
            },
          },
          LineNum: 1,
          Amount: 87.5,
          Id: "1",
        },
        {
          DetailType: "SubTotalLineDetail",
          Amount: 87.5,
          SubTotalLineDetail: {},
        },
      ],
      ApplyTaxAfterDiscount: false,
      CustomField: [
        {
          DefinitionId: "1",
          Type: "StringType",
          Name: "Crew #",
        },
      ],
      Id: "66",
      TxnTaxDetail: {
        TotalTax: 0,
      },
      MetaData: {
        CreateTime: "2014-09-17T15:35:07-07:00",
        LastUpdatedTime: "2014-09-17T15:35:07-07:00",
      },
    },
  ],
};

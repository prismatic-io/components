export const createExpenseExamplePayload = {
  data: {
    responseCode: 200,
    transactionList: [
      {
        amount: 1234,
        merchant: "Name Of Merchant 1",
        created: "2016-01-01",
        transactionID: "6720309558248016",
        currency: "USD",
      },
      {
        amount: 2211,
        merchant: "Name Of Merchant 2",
        created: "2016-01-31",
        transactionID: "6720309558248017",
        currency: "CAD",
      },
    ],
  },
};

export const getPriceListExamplePayload = {
  data: {
    RoundingMethod: "borm_NoRounding",
    GroupNum: "boplgn_Group2",
    BasePriceList: 2,
    Factor: 1,
    PriceListNo: 2,
    PriceListName: "Buying Price List",
    IsGrossPrice: "tNO",
    Active: "tYES",
    ValidFrom: null,
    ValidTo: null,
    DefaultPrimeCurrency: "INR",
    DefaultAdditionalCurrency1: "INR",
    DefaultAdditionalCurrency2: "INR",
    RoundingRule: "borrRoundOff",
    FixedAmount: 0,
  },
};

export const listPriceListsExamplePayload = {
  data: [getPriceListExamplePayload.data],
};

export const sendIdocExamplePayload = {
  data: "IDoc-XML-inbound ok",
};

export const getIdocStatusExamplePayload = {
  data: {
    rows: [
      {
        DOCNUM: "0000000001234567",
        STATUS: "53",
        STACOD: "",
        STATXT: "Application document posted",
        CREDAT: "20260304",
        CRETIM: "143000",
      },
    ],
    rowCount: 1,
  },
};

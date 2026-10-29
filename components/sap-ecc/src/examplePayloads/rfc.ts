export const readTableExamplePayload = {
  data: {
    rows: [
      { MATNR: "000000000001", MTART: "RAW1", MAKTX: "Raw Material 1" },
      { MATNR: "000000000002", MTART: "FIN1", MAKTX: "Finished Product 1" },
    ],
    rowCount: 2,
  },
};

export const callBapiExamplePayload = {
  data: {
    bapiResponse: { RETURN: { TYPE: "", MESSAGE: "" } },
    commitResponse: { RETURN: { TYPE: "", MESSAGE: "" } },
  },
};

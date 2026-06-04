import { carrierCode, connectionInput } from "../../common";

export const selectServicesInputs = {
  carrierCode: { ...carrierCode, dataSource: undefined },
  connectionInput,
};

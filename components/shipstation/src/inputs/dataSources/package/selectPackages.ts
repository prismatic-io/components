import { carrierCode, connectionInput } from "../../common";

export const selectPackagesInputs = {
  carrierCode: { ...carrierCode, dataSource: undefined },
  connectionInput,
};

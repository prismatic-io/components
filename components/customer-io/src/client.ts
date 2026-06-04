import { Connection, ConnectionError, util } from "@prismatic-io/spectral";
import { TrackClient, RegionUS, RegionEU } from "customerio-node";

const getRegion = (region) => {
  if (region === "US") {
    return RegionUS;
  } else if (region === "EU") {
    return RegionEU;
  }
  throw new Error(`Unsupported region: ${region}`);
};

export const createCustomerClient = (cioConnection: Connection, region) => {
  if (cioConnection.key !== "apiKey") {
    throw new ConnectionError(
      cioConnection,
      `Unsupported authorization method: ${cioConnection.key}`
    );
  }

  return new TrackClient(
    util.types.toString(cioConnection.fields.siteId),
    util.types.toString(cioConnection.fields.apiKey),
    { region: getRegion(region) }
  );
};

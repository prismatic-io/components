import { type Connection, ConnectionError, util } from "@prismatic-io/spectral";
export const getStripeKey = (stripeConnection: Connection) => {
  if (stripeConnection.key !== "apiKey") {
    throw new ConnectionError(
      stripeConnection,
      "Unsupported authorization method",
    );
  }
  return util.types.toString(stripeConnection.fields.apiKey);
};

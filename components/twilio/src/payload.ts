import { parsePhoneNumber, getNumberFrom } from "awesome-phonenumber";

export interface PayloadParameters {
  to: string;
  from: string;
  message: string;
}

export const createPayload = ({ to, from, message }: PayloadParameters) => {
  const toNumber = parsePhoneNumber(to, { regionCode: "US" });
  const fromNumber = parsePhoneNumber(from, { regionCode: "US" });

  if (!toNumber.valid) {
    throw Error("The recipient must be a valid phone number");
  }

  if (!fromNumber.valid) {
    throw Error("The sender must be a valid phone number");
  }

  return {
    to: getNumberFrom(toNumber).number,
    from: getNumberFrom(fromNumber).number,
    body: message,
  };
};

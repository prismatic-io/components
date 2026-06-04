import { createHmac } from "node:crypto";
import { util } from "@prismatic-io/spectral";
import type { ValidateMacSignatureParams } from "../../interfaces";

export const validateMacSignature = ({
  macSecret,
  payload,
  logger,
  debug,
}: ValidateMacSignatureParams) => {
  const headers = util.types.lowerCaseHeaders(payload.headers);
  const macHeader = headers["x-airtable-content-mac"];

  if (!macHeader) {
    throw new Error("No MAC header found in request");
  }

  const macSecretDecoded = Buffer.from(macSecret, "base64");

  const bodyString = Buffer.isBuffer(payload.rawBody.data)
    ? payload.rawBody.data.toString("utf8")
    : JSON.stringify(payload.rawBody.data);

  const hmac = createHmac("sha256", macSecretDecoded);
  hmac.update(bodyString, "utf8");
  const expectedContentHmac = `hmac-sha256=${hmac.digest("hex")}`;

  if (debug) {
    logger.debug("MAC validation details", {
      macHeader,
      expectedContentHmac,
      bodyPreview: bodyString.substring(0, 100),
    });
  }
  if (macHeader !== expectedContentHmac) {
    throw new Error(
      "Invalid MAC signature - request not from Airtable or using incorrect secret",
    );
  }

  if (debug) {
    logger.debug("MAC signature validated successfully");
  }
};

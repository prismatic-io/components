import { createHash, createPrivateKey, createPublicKey } from "node:crypto";
import { type ActionLogger, util } from "@prismatic-io/spectral";
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { sign } from "jsonwebtoken";
import { ACCEPTED, BAD_REQUEST } from "../constants";
import type { QueryStatus, ResultSet } from "../types";

export const sleep = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

export const pollForResults = async (
  client: HttpClient,
  logger: ActionLogger,
  handlerIds: Array<string>,
  sleepTime: number,
): Promise<Array<ResultSet>> => {
  let i = 1;
  let flag = true;
  const results: Array<ResultSet> = [];

  logger.info(`Started polling for handlerIds: ${handlerIds}}`);
  for await (const handlerId of handlerIds) {
    logger.info(`Polling for results, progress: ${i} of ${handlerIds.length}`);
    do {
      const pollResult = await client.get<QueryStatus>(`/api/v2/statements/${handlerId}`);

      const { status: pollStatus } = pollResult;
      if (pollStatus === ACCEPTED) {
        logger.debug(
          `Statement with handlerId: ${handlerId} still in running state, polling again in 1.5s`,
        );
        await sleep(sleepTime);
      } else {
        if (pollStatus >= BAD_REQUEST) {
          throw new Error("Error while polling for results.");
        }

        results.push(pollResult as unknown as ResultSet);
        flag = false;
      }
    } while (flag);

    i = i + 1;
  }

  return results;
};

export const generateJwtAuthToken = (
  privateKeyInput: string,
  qualifiedUsername: string,
  passphrase: string,
): string => {
  const KEY_FORMAT = "pem";

  const privateKey = createPrivateKey({
    format: KEY_FORMAT,
    key: privateKeyInput,
    passphrase,
  }).export({ format: KEY_FORMAT, type: "pkcs8" });

  const publicKey = createPublicKey({
    format: KEY_FORMAT,
    key: privateKey,
  }).export({
    format: "der",
    type: "spki",
  });

  const publicKeyFingerprint = `SHA256:${createHash("sha256").update(publicKey).digest("base64")}`;

  const now = Date.now();
  const signOptions = {
    iss: `${qualifiedUsername}.${publicKeyFingerprint}`,
    sub: qualifiedUsername,
    exp: Math.floor(now / 1000) + 60 * 60,
  };

  return sign(signOptions, privateKey, { algorithm: "RS256" });
};






export const cleanFunctionForSnowflakeUserInputs = (value: unknown): string => {
  
  
  
  const DOT_LITERAL_REGEX = /\./g;

  return util.types.toString(value).toUpperCase().replace(DOT_LITERAL_REGEX, "-");
};




export const cleanString = (value: unknown): string | undefined => {
  const str = util.types.toString(value);
  return str ? str : undefined;
};

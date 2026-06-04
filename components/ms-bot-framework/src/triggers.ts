import { trigger, util } from "@prismatic-io/spectral";
import { promisify } from "node:util";
import {
  verify as verifyCb,
  type Secret,
  type GetPublicKeyOrSecret,
  type VerifyOptions,
} from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { createClient as createHttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { botId } from "./inputs";



const verify = promisify<string, Secret | GetPublicKeyOrSecret, VerifyOptions>(verifyCb);


const botTrigger = trigger({
  display: {
    label: "Bot Framework Trigger",
    description: "Trigger that validates incoming requests as coming from Bot Framework",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "Management"],
  perform: async (context, payload, params) => {
    const bypassHeader = util.types.toBool(
      payload.headers?.["prismatic-bypass-challenge"] || false,
    );
    if (bypassHeader) {
      return Promise.resolve({ payload, branch: "Management" });
    }

    if (context.isSimulatedTestExecution) {
      return { payload, branch: "Notification" };
    }

    const client = createHttpClient({
      baseUrl: "https://login.botframework.com/v1/.well-known",
    });

    const { data: openIdConfig } = await client.get("/openidconfiguration");
    const signingAlgorithms = openIdConfig.id_token_signing_alg_values_supported;
    if (!signingAlgorithms) {
      throw new Error("Error fetching Open ID Configuration.");
    }

    const jwksClient = new JwksClient({
      jwksUri: "https://login.botframework.com/v1/.well-known/keys",
    });

    
    const authorizationHeader = payload.headers.Authorization;
    if (!authorizationHeader) {
      throw new Error("Error validating message signature: missing Authorization header.");
    }

    const [scheme, token] = authorizationHeader.trim().split(" ");
    if (scheme !== "Bearer") {
      throw new Error("Error validating message signature: invalid Authorization header.");
    }

    const result = (await verify(
      token,
      (headers, callback) => {
        jwksClient.getSigningKey(headers.kid, (_err, key) => {
          if (!key) {
            callback(new Error("Failed to find valid signing key."));
            return;
          }
          callback(null, key.getPublicKey());
        });
      },
      {
        clockTolerance: 5 * 60,
        issuer: "https://api.botframework.com",
        audience: params.botId,
        algorithms: signingAlgorithms,
      },
    )) as unknown as { serviceurl: string; serviceUrl: string };

    const claimServiceUrl = result.serviceurl || result.serviceUrl;
    const payloadServiceUrl = (payload.body.data as { serviceUrl: string }).serviceUrl;

    if (!claimServiceUrl || !payloadServiceUrl || claimServiceUrl !== payloadServiceUrl) {
      throw new Error("Error validating message signature: serviceUrl mismatch.");
    }

    return { payload, branch: "Notification" };
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  inputs: {
    botId: {
      ...botId,
      label: "Microsoft App ID",
      example: "467105c0-7417-53fb-a409-4bf400037d17",
      comments: "Microsoft App ID found in the Azure Bot's Configuration blade.",
    },
  },
});

export default {
  botTrigger,
};

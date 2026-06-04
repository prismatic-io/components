import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getAccountInputs as inputs } from "../../inputs/account";
import type { GetAccountResponse } from "../../interfaces/account";
import { getAccountExamplePayload as examplePayload } from "../../examplePayloads/account";

export const getAccount = action({
  display: {
    label: "Get Account",
    description: "Retrieve your account.",
  },
  perform: async (context, { connection }) => {
    const { data } = await createClient({
      connection,
      debug: context.debug.enabled,
    }).get<GetAccountResponse>("/account");

    return {
      data,
    };
  },
  inputs,
  examplePayload,
});

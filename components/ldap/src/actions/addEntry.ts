import { action } from "@prismatic-io/spectral";
import { getLdapClient } from "../client";
import { addEntryExamplePayload as examplePayload } from "../examplePayloads";
import { addEntryInputs as inputs } from "../inputs";

export const addEntry = action({
  display: {
    label: "Add Entry",
    description: "Adds an entry in Active Directory.",
  },
  perform: async (context, { connection, dnToAdd, attributesToAdd }) => {
    const client = await getLdapClient(connection);

    if (context.debug.enabled) {
      context.logger.debug({ dnToAdd, attributesToAdd });
    }

    try {
      await client.add(
        dnToAdd,
        attributesToAdd as Record<string, string | string[]>,
      );

      return { data: `Entry added at ${dnToAdd}.` };
    } catch (err) {
      throw new Error(`Failed to add entry at ${dnToAdd}: ${err}`);
    } finally {
      await client.unbind();
    }
  },
  inputs,
  examplePayload,
});

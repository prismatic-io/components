import { action, outputSchema } from "@prismatic-io/spectral";
import { listTemplatesOutputSchema } from "../../outputSchemas";
import { getApi } from "../../api";
import { listTemplatesInputs as inputs } from "../../inputs";
import { fetchTemplates } from "../../util";
import { listTemplatesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../constants";
import type { FieldsTemplate } from "../../types";
export const listTemplates = action({
  display: {
    label: "List Templates",
    description: "Get all templates in an account.",
  },
  performSafety: "notAllowed",
  perform: async (context, { connection, fieldsTemplate }) => {
    const templatesApi = getApi(connection, KlaviyoApi.Templates);
    const debug = context.debug.enabled;
    if (debug) {
      context.logger.debug({ connection, fieldsTemplate, debug });
    }
    const data = await fetchTemplates(
      templatesApi,
      fieldsTemplate as FieldsTemplate[],
      [],
      undefined,
    );
    return {
      data,
    };
  },
  inputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTemplatesOutputSchema,
  }),
  examplePayload: listTemplatesExamplePayload,
});

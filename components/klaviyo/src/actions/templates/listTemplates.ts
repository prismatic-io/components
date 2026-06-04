import { action } from "@prismatic-io/spectral";
import { getApi } from "../../api";
import { listTemplatesInputs as inputs } from "../../inputs/templates";
import type { FieldsTemplate } from "../../types/FieldsTemplate";
import { fetchTemplates } from "../../utils";
import { listTemplatesExamplePayload } from "../../examplePayloads";
import { KlaviyoApi } from "../../enums/KlaviyoApi";

export const listTemplates = action({
  display: {
    label: "List Templates",
    description: "Get all templates in an account.",
  },
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
  examplePayload: listTemplatesExamplePayload,
});

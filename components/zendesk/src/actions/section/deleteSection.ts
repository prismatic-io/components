import { action } from "@prismatic-io/spectral";
import { connectionInput, locale, sectionId } from "../../inputs";
import { rawHttpClient } from "../../auth";

export const deleteSection = action({
  display: {
    label: "Delete Section",
    description:
      "Delete a section in the Help Center. (warning: deleting a section also deletes all its articles).",
  },
  perform: async (context, { sectionId, locale, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.delete(
      `/help_center/${locale}/sections/${sectionId}.json`,
    );

    return {
      data,
    };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    sectionId,
  },
  examplePayload: {
    data: null,
  },
});

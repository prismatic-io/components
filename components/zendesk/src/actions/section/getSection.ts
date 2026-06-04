import { action } from "@prismatic-io/spectral";
import { connectionInput, locale, sectionId } from "../../inputs";
import { rawHttpClient } from "../../auth";
import type { Section } from "../../types";
import { getSectionPayload } from "../../examplePayloads";

export const getSection = action({
  display: {
    label: "Get Section",
    description: "Get a section from the Help Center.",
  },
  perform: async (context, { locale, sectionId, zendeskConnection }) => {
    const client = rawHttpClient(zendeskConnection, context.debug.enabled);
    const { data } = await client.get<{ section: Section }>(
      `/help_center/${locale}/sections/${sectionId}`,
    );

    return { data };
  },
  inputs: {
    zendeskConnection: connectionInput,
    locale,
    sectionId,
  },
  examplePayload: {
    data: getSectionPayload,
  },
});

import { dataSource, type Element } from "@prismatic-io/spectral";
import { createAemClient } from "../client";
import { SITES_API_PATH } from "../constants";
import { selectContentFragmentModelExamplePayload } from "../examplePayloads";
import { selectContentFragmentModelInputs } from "../inputs";
import type { ContentFragmentModel } from "../types";
import { compareElementLabels, fetchCursorPages } from "../utils";

export const selectContentFragmentModel = dataSource({
  display: {
    label: "Select Content Fragment Model",
    description: "Select a content fragment model from the list of models.",
  },
  inputs: selectContentFragmentModelInputs,
  examplePayload: selectContentFragmentModelExamplePayload,
  perform: async (_context, { connection }) => {
    const client = createAemClient(connection, false);
    const { items } = await fetchCursorPages<ContentFragmentModel>(
      client,
      `${SITES_API_PATH}/cf/models`,
      {},
      { fetchAll: true },
    );
    const result = items
      .map<Element>((model) => ({
        label: model.title ?? model.name,
        key: model.id,
      }))
      .sort(compareElementLabels);
    return { result };
  },
  dataSourceType: "picklist",
});

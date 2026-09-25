import type { Section } from "../types";
import { paginationAttributes } from "./general";
const createSectionRaw = {
  section: {
    description: "This section contains articles on flight instruments",
    id: 3457836,
    locale: "en-us",
    name: "Avionics",
    position: 2,
  },
};
const getSectionRaw = createSectionRaw;
const updateSectionRaw = {
  section: {
    description: "This section contains articles on flight instruments",
    id: 3457836,
    locale: "en-us",
    name: "Avionics",
    position: 2,
  },
};
const listSectionsRaw = {
  ...paginationAttributes,
  sections: [
    {
      category_id: 888887,
      description: "This section contains articles on flight instruments",
      id: 35467,
      locale: "en-us",
      name: "Avionics",
    },
    {
      category_id: 887285,
      description: "This section contains weather resources for pilots",
      id: 36169,
      locale: "en-us",
      name: "Weather",
    },
  ],
};
export const createSectionExamplePayload: {
  data: {
    section: Section;
  };
} = {
  data: createSectionRaw,
};
export const deleteSectionExamplePayload = { data: "" };
export const getSectionExamplePayload: {
  data: {
    section: Section;
  };
} = {
  data: getSectionRaw,
};
export const listSectionsExamplePayload = { data: listSectionsRaw };
export const updateSectionExamplePayload: {
  data: {
    section: Section;
  };
} = {
  data: updateSectionRaw,
};

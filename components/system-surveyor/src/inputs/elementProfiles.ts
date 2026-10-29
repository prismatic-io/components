import { input, util } from "@prismatic-io/spectral";
import { toOptionalObject } from "../util/cleanFunctions";
import {
  connectionInput,
  fetchAll,
  pageNumber,
  pageSize,
  teamIdInput,
} from "./common";

const elementId = input({
  label: "Element ID",
  type: "string",
  required: true,
  comments: "The numeric identifier of the element.",
  placeholder: "Enter element ID",
  example: "68",
  clean: util.types.toNumber,
  dataSource: "selectElementProfile",
});

const elementProfileName = input({
  label: "Element Profile Name",
  type: "string",
  required: true,
  comments:
    "The display name assigned to the element profile in System Surveyor.",
  placeholder: "Enter element profile name",
  example: "ACP Server - SW - 11TB",
  clean: util.types.toString,
});

const content = input({
  label: "Content",
  type: "code",
  language: "json",
  required: false,
  clean: toOptionalObject,
  placeholder: "Enter JSON content",
  comments:
    "A JSON array of attribute objects to assign to the element profile. Each object requires an `attribute_id` and a `value`. See the [Element Profiles API reference](https://docs.openapi.systemsurveyor.com/#tag/Element-Profiles/operation/create_element_profile) for the full schema.",
  example: JSON.stringify(
    {
      attribute: [
        {
          attribute_id: 455,
          value: "49494A",
        },
      ],
      child: [
        {
          element_id: "4545",
          systemtype_id: "49050",
        },
      ],
      pdf_url: [
        {
          link_type: 3,
          url: "https://www.google.com/somedoc.pdf",
          name: "Some Link",
        },
      ],
    },
    null,
    2,
  ),
});

const accessories = input({
  label: "Accessories",
  type: "code",
  language: "json",
  required: false,
  clean: toOptionalObject,
  placeholder: "Enter JSON accessories",
  comments:
    "A JSON array of accessory objects to assign to the element profile. Each object requires an `attribute_id` and a `value`. See the [Element Profiles API reference](https://docs.openapi.systemsurveyor.com/#tag/Element-Profiles/operation/create_element_profile) for the full schema.",
  example: JSON.stringify(
    [
      {
        team_id: 0,
        element_id: 0,
        description: "Accessory 1",
        manufacturer: "string",
        model: "string",
        price: 0.1,
        labor_hours: 0.1,
        created_at: 0,
      },
    ],
    null,
    2,
  ),
});

export const listElementProfilesInputs = {
  ssvConnection: connectionInput,
  teamId: teamIdInput,
  fetchAll,
  pageNumber,
  pageSize,
};

export const getElementProfileAccessoriesInputs = {
  ssvConnection: connectionInput,
  teamId: teamIdInput,
  elementId,
};

export const syncElementProfileInputs = {
  ssvConnection: connectionInput,
  teamId: teamIdInput,
  elementId,
  name: elementProfileName,
  content,
  accessories,
};

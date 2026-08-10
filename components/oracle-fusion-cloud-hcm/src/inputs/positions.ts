import { input } from "@prismatic-io/spectral";
import { cleanId } from "../util/transforms";
import {
  connection,
  effectiveDate,
  fetchAll,
  includeMetadataLinks,
  pagination,
} from "./common";
const positionId = input({
  label: "Position ID",
  type: "string",
  required: true,
  dataSource: "selectPosition",
  comments:
    "The unique numeric identifier for the Oracle HCM position (PositionId).",
  placeholder: "Enter position ID",
  example: "300100012345678",
  clean: cleanId,
});
export const getPositionInputs = {
  connection,
  effectiveDate,
  positionId,
  includeMetadataLinks,
};
export const listPositionsInputs = {
  connection,
  fetchAll,
  pagination,
  effectiveDate,
  includeMetadataLinks,
};

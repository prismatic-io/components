import { input, util } from "@prismatic-io/spectral";
import { driveOrSiteId, workbookId, worksheetId } from "../general";
import { address } from "./general";
import { cleanCode } from "../../helpers";

const columnHidden = input({
  label: "Column Hidden",
  comments: "When true, all columns in the current range are hidden.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

const rowHidden = input({
  label: "Row Hidden",
  comments: "When true, all rows in the current range are hidden.",
  type: "boolean",
  required: false,
  clean: util.types.toBool,
});

const formulas = input({
  label: "Formulas",
  comments: "Represents the formula in A1-style notation.",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter formulas as a 2D JSON array",
  example: JSON.stringify(
    [
      [null, null],
      [null, "=B1*2"],
    ],
    null,
    2,
  ),
  clean: cleanCode,
});

const formulasLocal = input({
  label: "Formulas Local",
  comments:
    "Represents the formula in A1-style notation, in the user's language and number-formatting locale. For example, the English '=SUM(A1, 1.5)' formula would become '=SUMME(A1; 1,5)' in German.",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter locale-formatted formulas as a 2D JSON array",
  example: JSON.stringify(
    [
      [null, null],
      [null, "=SUM(A1, 1.5)"],
    ],
    null,
    2,
  ),
  clean: cleanCode,
});

const formulasR1C1 = input({
  label: "Formulas R1C1",
  comments: "Represents the formula in R1C1-style notation.",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter R1C1-style formulas as a 2D JSON array",
  example: JSON.stringify(
    [
      [null, null],
      [null, "=SUM(A1, 1.5)"],
    ],
    null,
    2,
  ),
  clean: cleanCode,
});

const numberFormat = input({
  label: "Number Format",
  comments: "Represents Excel's number format code for the given cell.",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter number format codes as a 2D JSON array",
  example: JSON.stringify(
    [
      [null, null],
      ["m-ddd", null],
    ],
    null,
    2,
  ),
  clean: cleanCode,
});

const values = input({
  label: "Values",
  comments:
    "Represents the raw values of the specified range. The data returned could be of type string, number, or a Boolean. Cell that contains an error returns the error string.",
  type: "code",
  language: "json",
  required: false,
  placeholder: "Enter cell values as a 2D JSON array",
  example: JSON.stringify(
    [
      ["Hello", "100"],
      ["1/1/2016", null],
    ],
    null,
    2,
  ),
  clean: cleanCode,
});

export const updateCellInputs = {
  driveOrSiteId,
  workbookId: {
    ...workbookId,
    comments:
      "The ID of the workbook that contains the worksheet to update cells from.",
  },
  worksheetId: {
    ...worksheetId,
    comments: "The ID or name of the worksheet to update cells from.",
  },
  address,
  columnHidden,
  rowHidden,
  formulas,
  formulasLocal,
  formulasR1C1,
  numberFormat,
  values,
};

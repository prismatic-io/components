import { input, util } from "@prismatic-io/spectral";
import { cleanString } from "../util";
import { connectionInput } from "./common";





export const fileId = input({
  label: "File ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the file in the Import Tool.",
  placeholder: "Enter file ID",
  example: "12345678-abcd-1234-efgh-567890ijklmn",
  clean: util.types.toString,
});

export const stagingId = input({
  label: "Staging ID",
  type: "string",
  required: true,
  comments:
    "The unique staging identifier returned from the Import XML Data action. Used to track transaction status.",
  placeholder: "Enter staging ID",
  example: "12345678-abcd-1234-efgh-567890ijklmn",
  clean: util.types.toString,
});

export const xmlTransaction = input({
  label: "XML Transaction",
  type: "code",
  language: "xml",
  required: true,
  comments:
    "The encoded XML transaction to submit to the Import Tool. See the [Import Tool XML and Configuration Settings Guide](https://developer.ukg.com/hcm/reference/importtool_importsxmldata) for transaction format.",
  example: `<?xml version="1.0" encoding="utf-8"?>
<ImportToolRequest>
  <Transaction Type="NewHire">
    <Employee>
      <FirstName>John</FirstName>
      <LastName>Doe</LastName>
      <Email>john.doe@example.com</Email>
    </Employee>
  </Transaction>
</ImportToolRequest>`,
  clean: util.types.toString,
});

export const uniqueFileName = input({
  label: "Unique File Name",
  type: "string",
  required: false,
  comments: "Optional unique file name for the import transaction. Must end with .xml extension.",
  placeholder: "Enter file name (e.g., import-2024-01-15.xml)",
  example: "newhire-batch-2024-01-15.xml",
  clean: cleanString,
});





export const getFileStatusInputs = {
  connection: connectionInput,
  fileId,
};

export const getFileSummaryInputs = {
  connection: connectionInput,
  fileId,
};

export const getImportStatusInputs = {
  connection: connectionInput,
  stagingId,
};

export const getTransactionStatusInputs = {
  connection: connectionInput,
};

export const importXmlDataInputs = {
  connection: connectionInput,
  xmlTransaction,
  uniqueFileName,
};

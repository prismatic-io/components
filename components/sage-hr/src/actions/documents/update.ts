import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updateDocumentExamplePayload } from "../../examplePayloads";
import {
  category_id,
  connectionInput,
  description,
  document_id,
  employee_ids,
  expiration_date,
  expires,
  file_name,
  fileInput,
  notify,
  right_to_work_document_number,
  right_to_work_document_type,
  shared_with_direct_manager,
  shared_with_everyone,
  shared_with_team_manager,
  source,
  status,
} from "../../inputs";
import { generateForm } from "../../util";

export const updateDocument = action({
  display: {
    label: "Update Document",
    description: "Document will only be visible to employee themselves.",
  },
  inputs: {
    connectionInput,
    document_id: { ...document_id, comments: "ID of document to be updated" },
    fileInput,
    file_name,
    employee_id: employee_ids,
    category_id,
    description,
    notify,
    source,
    shared_with_everyone,
    shared_with_team_manager,
    shared_with_direct_manager,
    status,
    right_to_work_document_type,
    right_to_work_document_number,
    expires,
    expiration_date,
  },
  perform: async (
    context,
    {
      connectionInput,
      document_id,
      fileInput,
      file_name,
      employee_id,
      ...params
    },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);
    const { data: fileData, contentType } = fileInput;
    const formData = generateForm(params);
    employee_id.forEach((id) => {
      formData.append("employee_id[]", id);
    });
    formData.append("file", fileData, { filename: file_name, contentType });
    const { data } = await client.put(
      `/documents/${document_id}`,
      formData.getBuffer(),
      {
        headers: {
          ...formData.getHeaders(),
        },
      },
    );
    return {
      data,
    };
  },
  examplePayload: updateDocumentExamplePayload,
});

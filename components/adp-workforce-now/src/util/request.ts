import { type KeyValuePair, util } from "@prismatic-io/spectral";
import FormData from "form-data";
export const toFormData = (
  formData: KeyValuePair<unknown>[],
  fileData: KeyValuePair<unknown>[],
  fileDataFileNames: Record<string, string> | undefined,
): FormData => {
  const form = new FormData();
  (formData || []).map(({ key, value }) => form.append(key, value));
  (fileData || []).map(({ key, value }) =>
    form.append(key, util.types.toBufferDataPayload(value).data, {
      filename:
        (fileDataFileNames === null || fileDataFileNames === undefined
          ? undefined
          : fileDataFileNames[key]) || key,
    }),
  );
  return form;
};

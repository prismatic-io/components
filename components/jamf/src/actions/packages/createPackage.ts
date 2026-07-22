import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createPackageExamplePayload } from "../../examplePayloads";
import { createPackageInputs } from "../../inputs";
import type { JamfCreateResponse } from "../../types";
export const createPackage = action({
  display: {
    label: "Create Package",
    description: "Create a new package record in Jamf Pro.",
  },
  inputs: createPackageInputs,
  perform: async (
    context,
    {
      connection,
      packageName,
      packageFileName,
      packageCategoryId,
      additionalFields,
    },
  ) => {
    const {
      packagePriority,
      packageInfo,
      packageNotes,
      packageRebootRequired,
      packageOsInstall,
      packageFillUserTemplate,
      packageSuppressUpdates,
      packageSuppressEula,
      packageSuppressFromDock,
      packageSuppressRegistration,
    } = additionalFields;
    const client = await createClient(connection, context.debug.enabled);
    const body = {
      packageName,
      fileName: packageFileName,
      categoryId: packageCategoryId ?? "-1",
      priority: packagePriority ? packagePriority : 10,
      rebootRequired: packageRebootRequired,
      osInstall: packageOsInstall,
      fillUserTemplate: packageFillUserTemplate,
      suppressUpdates: packageSuppressUpdates,
      suppressEula: packageSuppressEula,
      suppressFromDock: packageSuppressFromDock,
      suppressRegistration: packageSuppressRegistration,
      info: packageInfo,
      notes: packageNotes,
    };
    const { data } = await client.post<JamfCreateResponse>(
      "/v1/packages",
      body,
    );
    return { data };
  },
  examplePayload: createPackageExamplePayload,
});

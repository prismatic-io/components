import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { updatePackageExamplePayload } from "../../examplePayloads";
import { updatePackageInputs } from "../../inputs";
import type { Package } from "../../types";
import { mergeDefined } from "../../util";
export const updatePackage = action({
  display: {
    label: "Update Package",
    description: "Update an existing package record.",
  },
  inputs: updatePackageInputs,
  perform: async (
    context,
    { connection, resourceId, packageCategoryId, additionalFields },
  ) => {
    const {
      packageName,
      packageFileName,
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
    const { data: existing } = await client.get<Package>(
      `/v1/packages/${resourceId}`,
    );
    const body = mergeDefined(existing, {
      packageName,
      fileName: packageFileName,
      categoryId: packageCategoryId,
      priority: packagePriority,
      rebootRequired: packageRebootRequired,
      osInstall: packageOsInstall,
      fillUserTemplate: packageFillUserTemplate,
      suppressUpdates: packageSuppressUpdates,
      suppressEula: packageSuppressEula,
      suppressFromDock: packageSuppressFromDock,
      suppressRegistration: packageSuppressRegistration,
      info: packageInfo,
      notes: packageNotes,
    });
    const { data } = await client.put<Package>(
      `/v1/packages/${resourceId}`,
      body,
    );
    return { data };
  },
  examplePayload: updatePackageExamplePayload,
});

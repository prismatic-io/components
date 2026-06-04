import { dataSource } from "@prismatic-io/spectral";
import { getClient } from "../client";
import { connection, consumerOrgId, projectId, workspaceId } from "../inputs";

export const selectRegistration = dataSource({
  display: {
    label: "Select Registration",
    description:
      "Select an Adobe I/O Events Registration from those available in your workspace.",
  },
  inputs: {
    connection,
    consumerOrgId,
    projectId,
    workspaceId,
  },
  perform: async (
    _context,
    { connection, consumerOrgId, projectId, workspaceId },
  ) => {
    const client = getClient(connection, false);
    const { data } = await client.get(
      `/${consumerOrgId}/${projectId}/${workspaceId}/registrations`,
    );

    const registrations = data?._embedded?.registrations ?? [];

    return {
      result: registrations
        .map((registration: { registration_id: string; name: string }) => ({
          label: registration.name,
          key: registration.registration_id.toString(),
        }))
        .sort((a: { label: string }, b: { label: string }) =>
          a.label < b.label ? -1 : 1,
        ),
    };
  },
  dataSourceType: "picklist",
  examplePayload: {
    result: [
      {
        label: "Example Registration",
        key: "example-registration-id-123",
      },
    ],
  },
});

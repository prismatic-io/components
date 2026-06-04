import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateSpaceExamplePayload } from "../../examplePayloads";
import {
  adminCanManage,
  color,
  connectionInput,
  enableChecklists,
  enableCustomFields,
  enableDependencyWarning,
  enableDueDates,
  enablePortfolios,
  enableRemapDependencies,
  enableTags,
  enableTimeEstimates,
  enableTimeTracking,
  getSpaceId,
  multipleAssignees,
  privateInput,
  remapClosedDueDates,
  remapDueDates,
  spaceName,
  useStartDate,
} from "../../inputs";
import type { Body } from "./types/Body";

const spaceId = getSpaceId(true);

export const updateSpace = action({
  display: {
    label: "Update Space",
    description: "Rename a space, set its color, and enable ClickApps for the space.",
  },
  examplePayload: updateSpaceExamplePayload,
  perform: async (
    context,
    {
      clickUpConnection,
      spaceId,
      spaceName,
      multipleAssignees,
      enableDueDates,
      useStartDate,
      remapDueDates,
      remapClosedDueDates,
      enableTimeTracking,
      enableTags,
      enableTimeEstimates,
      enableChecklists,
      enableCustomFields,
      enableRemapDependencies,
      enableDependencyWarning,
      enablePortfolios,
      color,
      privateInput,
      adminCanManage,
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: Body = {
      name: spaceName,
      color,
      private: privateInput,
      admin_can_manage: adminCanManage,
      multiple_assignees: multipleAssignees,
      features: {
        due_dates: {
          enabled: enableDueDates,
          start_date: useStartDate,
          remap_due_dates: remapDueDates,
          remap_closed_due_date: remapClosedDueDates,
        },
        time_tracking: {
          enabled: enableTimeTracking,
        },
        tags: {
          enabled: enableTags,
        },
        time_estimates: {
          enabled: enableTimeEstimates,
        },
        checklists: {
          enabled: enableChecklists,
        },
        custom_fields: {
          enabled: enableCustomFields,
        },
        remap_dependencies: {
          enabled: enableRemapDependencies,
        },
        dependency_warning: {
          enabled: enableDependencyWarning,
        },
        portfolios: {
          enabled: enablePortfolios,
        },
      },
    };

    const { data } = await client.put(`/space/${spaceId}`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    spaceId,
    spaceName,
    multipleAssignees,
    enableDueDates,
    useStartDate,
    remapDueDates,
    remapClosedDueDates,
    enableTimeTracking,
    enableTags,
    enableTimeEstimates,
    enableChecklists,
    enableCustomFields,
    enableRemapDependencies,
    enableDependencyWarning,
    enablePortfolios,
    color,
    privateInput,
    adminCanManage,
  },
});

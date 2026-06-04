import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createSpaceExamplePayload } from "../../examplePayloads";
import {
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
  getTeamId,
  multipleAssignees,
  remapClosedDueDates,
  remapDueDates,
  spaceName,
  useStartDate,
} from "../../inputs";
import type { Body } from "./types/Body";

const teamId = getTeamId(true);

export const createSpace = action({
  display: {
    label: "Create Space",
    description: "Add a new space to a workspace.",
  },
  examplePayload: createSpaceExamplePayload,
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
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
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body: Body = {
      name: spaceName,
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

    const { data } = await client.post(`/team/${teamId}/space`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
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
  },
});

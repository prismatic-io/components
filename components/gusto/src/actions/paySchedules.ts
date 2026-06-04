import { action } from "@prismatic-io/spectral";
import {
  companyIdInput,
  connectionInput,
  fetchAll,
  paginationPageInput,
  payScheduleIdInput,
} from "../inputs";
import { createClient } from "../client";
import { fetchAllPages } from "../util";
import {
  listPaySchedulesExamplePayload,
  getPayScheduleExamplePayload,
} from "../examplePayloads";

const listPaySchedules = action({
  display: {
    label: "List Pay Schedules",
    description: "List pay schedules for a company",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
    fetchAll,
    page: paginationPageInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);

    if (params.fetchAll) {
      const data = await fetchAllPages(
        client,
        `/companies/${params.companyId}/pay_schedules`,
      );
      return { data: { data, headers: {} } };
    }

    const { data, headers } = await client.get(
      `/companies/${params.companyId}/pay_schedules`,
      {
        params: { page: params.page },
      },
    );
    return { data: { data, headers } };
  },
  examplePayload: listPaySchedulesExamplePayload,
});

const getPaySchedule = action({
  display: {
    label: "Get Pay Schedule by ID",
    description: "Get a pay schedules for a company by pay schedule ID",
  },
  inputs: {
    connection: connectionInput,
    companyId: companyIdInput,
    payScheduleId: payScheduleIdInput,
  },
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data, headers } = await client.get(
      `/companies/${params.companyId}/pay_schedules/${params.payScheduleId}`,
    );
    return { data: { data, headers } };
  },
  examplePayload: getPayScheduleExamplePayload,
});

export default { getPaySchedule, listPaySchedules };

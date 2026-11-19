const paySchedulePayload = {
  uuid: "f2a69c38-e2f9-4e31-b5c5-4754fc60a052",
  version: "68934a3e9455fa72420237eb05902327",
  frequency: "Monthly",
  anchor_pay_date: "2022-12-11",
  anchor_end_of_pay_period: "2022-11-13",
  day_1: 11,
  day_2: null,
  name: null,
  custom_name: "every 11th of the month",
  auto_pilot: true,
  active: true,
  auto_payroll_enablement_blockers: null,
};

export const listPaySchedulesExamplePayload = {
  data: { data: [paySchedulePayload], headers: {} },
};

export const getPayScheduleExamplePayload = {
  data: { data: [paySchedulePayload], headers: {} },
};

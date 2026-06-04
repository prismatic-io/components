export const BASE_URL = "https://api.getbase.com/v2";
export const BASE_URL_V3 = "https://api.getbase.com/v3";

export const POLL_RESOURCE_CONFIG: Record<
  string,
  { label: string; endpoint: string }
> = {
  deals: { label: "Deals", endpoint: "/deals" },
  leads: { label: "Leads", endpoint: "/leads" },
  contacts: { label: "Contacts", endpoint: "/contacts" },
  tasks: { label: "Tasks", endpoint: "/tasks" },
  notes: { label: "Notes", endpoint: "/notes" },
};

export const pollResourceModel = Object.entries(POLL_RESOURCE_CONFIG).map(
  ([value, { label }]) => ({ label, value }),
);

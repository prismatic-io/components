import { SUCCESS_MESSAGE } from "../constants";
export const listUsersRaw = [
  {
    id: 223443,
    name: "Johnny Agent",
  },
  {
    id: 8678530,
    name: "James A. Rosen",
  },
];
const searchUsersRaw = [
  {
    id: 35436,
    name: "Robert Jones",
    notes: "sigil issue",
  },
  {
    id: 9873843,
    name: "Terry Gilliam",
  },
];
const createUserRaw = {
  id: 35436,
  name: "Roger Wilco",
  email: "roger.wilco@example.com",
  role: "agent",
  active: true,
  verified: true,
  organization_id: 509974,
  phone: "+15555550123",
  alias: "Roger",
  created_at: "2024-04-17T17:18:10Z",
  updated_at: "2024-04-17T17:18:10Z",
  url: "https://company.zendesk.com/api/v2/users/35436.json",
};
const showUserRaw = createUserRaw;
const updateUserRaw = createUserRaw;
export const createUserExamplePayload = { data: createUserRaw };
export const deleteUserExamplePayload = { data: SUCCESS_MESSAGE };
export const listUsersExamplePayload = { data: listUsersRaw };
export const searchUsersExamplePayload = { data: searchUsersRaw };
export const showUserExamplePayload = { data: showUserRaw as unknown };
export const updateUserExamplePayload = { data: updateUserRaw };

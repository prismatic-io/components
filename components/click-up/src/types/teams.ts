export interface GetTeamQueryParams {
  team_id?: string;
  group_ids?: string;
}
export interface UpdateTeamMembers {
  add?: number[];
  rem?: number[];
}
export interface UpdateTeamBody {
  name?: string;
  handle?: string;
  members?: UpdateTeamMembers;
}

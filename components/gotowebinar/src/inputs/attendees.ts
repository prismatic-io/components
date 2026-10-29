import {
  connection,
  fetchAll,
  registrantKey,
  sessionKey,
  webinarKey,
} from "./common";

export const getAttendeeInputs = {
  connection,
  webinarKey,
  sessionKey,
  registrantKey,
};

export const listAllAttendeesInputs = {
  connection,
  webinarKey,
  fetchAll,
};

export const listSessionAttendeesInputs = {
  connection,
  webinarKey,
  sessionKey,
};

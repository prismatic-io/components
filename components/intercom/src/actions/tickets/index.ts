import { createTicket } from "./create";
import { getTicket } from "./get";
import ticketTypes from "./types";

export default {
  createTicket,
  getTicket,
  ...ticketTypes,
};

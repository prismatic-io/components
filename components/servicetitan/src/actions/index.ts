import appointmentAssignments from "./appointmentAssignments";
import appointments from "./appointments";
import bookings from "./bookings";
import customers from "./customers";
import installedEquipment from "./installedEquipment";
import invoices from "./invoices";
import jobs from "./jobs";
import { listBusinessUnits } from "./listBusinessUnits";
import { listUserRoles } from "./listUserRoles";
import locations from "./locations";
import payments from "./payments";
import projects from "./projects";
import { rawRequest } from "./rawRequest";
import technician from "./technician";

export default {
  ...appointmentAssignments,
  ...appointments,
  ...bookings,
  ...customers,
  ...installedEquipment,
  ...invoices,
  ...jobs,
  listBusinessUnits,
  listUserRoles,
  ...locations,
  ...payments,
  ...projects,
  ...technician,
  rawRequest,
};

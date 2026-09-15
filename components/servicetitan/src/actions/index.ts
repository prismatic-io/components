import appointmentAssignments from "./appointmentAssignments";
import appointments from "./appointments";
import bookings from "./bookings";
import customerContact from "./customerContact";
import customers from "./customers";
import installedEquipment from "./installedEquipment";
import invoices from "./invoices";
import jobs from "./jobs";
import locations from "./locations";
import misc from "./misc";
import payments from "./payments";
import projects from "./projects";
import technician from "./technician";
export default {
  ...appointmentAssignments,
  ...appointments,
  ...bookings,
  ...customerContact,
  ...customers,
  ...installedEquipment,
  ...invoices,
  ...jobs,
  ...locations,
  ...misc,
  ...payments,
  ...projects,
  ...technician,
};

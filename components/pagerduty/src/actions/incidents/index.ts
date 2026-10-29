import { createIncident } from "./create";
import { createIncidentNote } from "./createIncidentNote";
import { getIncident } from "./get";
import { getIncidentAlert } from "./getIncidentAlert";
import { listIncidents } from "./list";
import { listIncidentAlerts } from "./listIncidentAlerts";
import { listIncidentNotes } from "./listIncidentNotes";
import { updateIncidents } from "./manage";
import { updateIncidentAlerts } from "./manageIncidentAlerts";
import { updateIncident } from "./update";
import { updateIncidentAlert } from "./updateIncidentAlert";

export default {
  listIncidents,
  createIncident,
  getIncident,
  updateIncident,
  listIncidentAlerts,
  getIncidentAlert,
  updateIncidentAlert,
  listIncidentNotes,
  createIncidentNote,
  updateIncidents,
  updateIncidentAlerts,
};

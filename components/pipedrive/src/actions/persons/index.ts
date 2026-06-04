import { addPerson } from "./addPerson";
import { addPersonFollower } from "./addPersonFollower";
import { deletePerson } from "./deletePerson";
import { deletePersonFollower } from "./deletePersonFollower";
import { deletePersonPicture } from "./deletePersonPicture";
import { getPerson } from "./getPerson";
import { getPersonActivities } from "./getPersonActivities";
import { getPersonDeals } from "./getPersonDeals";
import { getPersonFiles } from "./getPersonFiles";
import { getPersonFollowers } from "./getPersonFollowers";
import { getPersonMailMessages } from "./getPersonMailMessages";
import { getPersonProducts } from "./getPersonProducts";
import { getPersonUpdates } from "./getPersonUpdates";
import { getPersonUsers } from "./getPersonUsers";
import { getPersons } from "./getPersons";
import { mergePersons } from "./mergePersons";
import { searchPersons } from "./searchPersons";
import { updatePerson } from "./updatePerson";

export default {
  getPersons,
  addPerson,
  searchPersons,
  deletePerson,
  getPerson,
  updatePerson,
  getPersonActivities,
  getPersonDeals,
  getPersonFiles,
  getPersonUpdates,
  getPersonFollowers,
  addPersonFollower,
  deletePersonFollower,
  getPersonMailMessages,
  mergePersons,
  getPersonUsers,
  deletePersonPicture,
  getPersonProducts,
};

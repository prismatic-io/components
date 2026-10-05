import bucketNotificationsActions from "./bucketNotifications";
import bucketsActions from "./buckets";
import miscActions from "./misc";
import multipartUploadsActions from "./multipartUploads";
import objectLockActions from "./objectLock";
import objectsActions from "./objects";
import snsActions from "./sns";
import uploadStreamsActions from "./uploadStreams";
export default {
  ...bucketNotificationsActions,
  ...bucketsActions,
  ...miscActions,
  ...multipartUploadsActions,
  ...objectLockActions,
  ...objectsActions,
  ...snsActions,
  ...uploadStreamsActions,
};

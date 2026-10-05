import { pollChangesFilesTrigger } from "./pollChangesFilesTrigger";
import { pollNewBucketsTrigger } from "./pollNewBucketsTrigger";
import { snsS3NotificationWebhook } from "./snsS3NotificationWebhook";
export default {
  snsS3NotificationWebhook,
  pollChangesFilesTrigger,
  pollNewBucketsTrigger,
};

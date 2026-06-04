import type { Meeting } from "./Meeting";
import type { ChatMessage } from "./ChatMessage";
import type { Recording } from "./Recording";
import type { Registrant } from "./Registrant";
import type { UserChannel } from "./UserChannel";
import type { User } from "./User";
import type { Participant } from "./Participant";
import type { Webinar } from "./Webinar";

export interface PaginationResults {
  next_page_token: string | null;
  page_count: number;
  page_size: number;
  total_records: number;
  registrants?: Registrant[];
  meetings?: Meeting[];
  recordings?: Recording[];
  messages?: ChatMessage[];
  channels?: UserChannel[];
  users?: User[];
  participants?: Participant[];
  webinars?: Webinar[];
}

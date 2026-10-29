export interface ChatMessage {
  bot_message?: object;
  date_time: string;
  files: File[];
  rich_text: RichText[];
  download_url: string;
  file_id: string;
  file_name: string;
  file_size: number;
  id: string;
  message: string;
  reactions: Reaction[];
  reply_main_message_id: string;
  reply_main_message_timestamp: number;
  sender: string;
  sender_member_id: string;
  sender_display_name: string;
  status: string;
  timestamp: number;
  at_items: AtItem[];
}

interface File {
  download_url: string;
  file_id: string;
  file_name: string;
  file_size: number;
}

interface RichText {
  start_position: number;
  end_position: number;
  format_type: string;
  format_attr: string;
}

interface Reaction {
  emoji: string;
  total_count: number;
  senders: Sender[];
}

interface Sender {
  user_id: string;
  member_id: string;
}

interface AtItem {
  at_contact: string;
  at_contact_member_id: string;
  at_type: number;
  end_position: number;
  start_position: number;
}

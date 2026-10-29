export interface UserChannel {
  channel_settings: ChannelSettings;
  id: string;
  jid: string;
  name: string;
  type: number;
  channel_url: string;
}

interface ChannelSettings {
  add_member_permissions: number;
  new_members_can_see_previous_messages_files: boolean;
  posting_permissions: number;
  mention_all_permissions: number;
  allow_to_add_external_users: number;
}

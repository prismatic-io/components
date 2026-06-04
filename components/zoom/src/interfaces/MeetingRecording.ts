import type { AudioFile } from "./AudioFile";
import type { RecordingFile } from "./RecordingFile";

export interface MeetingRecording {
  account_id: string;
  duration: number;
  host_id: string;
  id: number;
  recording_count: number;
  start_time: string;
  topic: string;
  total_size: number;
  type: string;
  uuid: string;
  recording_play_passcode: string;
  recording_files: RecordingFile[];
  download_access_token: string;
  password: string;
  participant_audio_files: AudioFile[];
}

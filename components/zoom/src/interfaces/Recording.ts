export interface Recording {
  call_id: string;
  call_log_id: string;
  callee_name: string;
  callee_number: string;
  callee_number_type: number;
  caller_name: string;
  caller_number: string;
  caller_number_type: number;
  outgoing_by: {
    name: string;
    extension_number: string;
  };
  accepted_by: {
    name: string;
    extension_number: string;
  };
  date_time: string;
  direction: string;
  download_url: string;
  duration: number;
  id: string;
  transcript_download_url: string;
}

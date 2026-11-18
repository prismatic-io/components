export interface Board {
  id: string;
  name: string;
  state: string;
  board_folder_id: string | null;
  creator: {
    id: string;
  };
}

export type BoardIdName = Pick<Board, "id" | "name">;

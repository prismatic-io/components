export interface Board {
  id: string;
  name: string;
  state: string;
  board_folder_id: string;
  creator: {
    id: string;
  };
}
export type BoardIdName = Pick<Board, "id" | "name">;

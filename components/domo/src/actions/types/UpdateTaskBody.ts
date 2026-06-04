export type UpdateTaskBody = {
  id?: string;
  projectId?: string;
  projectListId?: string;
  taskName?: string;
  priority?: number;
  contributors?: number[];
  tags?: string[];
  archived?: boolean;
};

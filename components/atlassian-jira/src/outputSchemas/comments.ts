import { commentSchema, pageOfCommentsSchema } from "./common";

export const addCommentOutputSchema = commentSchema;

export const getCommentsOutputSchema = pageOfCommentsSchema;

export const updateCommentOutputSchema = commentSchema;

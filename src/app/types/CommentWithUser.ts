import type { Comment } from "./Comment";

export interface CommentWithUser extends Comment {
    user: { name: string; image: string | null };
}

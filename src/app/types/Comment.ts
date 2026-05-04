export interface Comment {
    id: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
    userId: string;
    postId: string;
    parentId: string | null;
}
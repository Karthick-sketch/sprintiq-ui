import { Comment } from './comment.model';

export class Ticket {
  id: number = 0;
  title: string = '';
  description: string = '';
  comments: Comment[] = [];
  subTickets: number[] = [];
  parentId: number | null = null;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

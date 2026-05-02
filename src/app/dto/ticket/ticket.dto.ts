import { Comment } from '../../models/ticket/comment.model';

export class TicketDTO {
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

export class TicketCreateRequestDTO {
  title: string = '';
  description: string = '';
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

export class TicketUpdateRequestDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  parentId: number | null = null;
  projectId: number = 0;
  sectionId: number = 0;
  orderIndex: number = 0;
}

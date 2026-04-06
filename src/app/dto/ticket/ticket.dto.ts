export interface TicketDTO {
  id: number;
  title: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  projectId: number;
  sectionId: number;
}

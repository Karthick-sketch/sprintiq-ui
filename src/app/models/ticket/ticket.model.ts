export interface Ticket {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee: string;
  dueDate: string;
  projectId: number;
  sectionId: number;
}

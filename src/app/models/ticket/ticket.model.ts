export class Ticket {
  id: number = 0;
  title: string = '';
  description: string = '';
  status: string = '';
  priority: string = '';
  assignee: string = '';
  dueDate: Date = new Date();
  projectId: number = 0;
  sectionId: number = 0;
}

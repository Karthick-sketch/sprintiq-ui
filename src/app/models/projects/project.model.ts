export interface Project {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  teamMemberIds: number[];
}

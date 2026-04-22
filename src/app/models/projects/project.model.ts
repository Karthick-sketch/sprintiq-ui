export interface Project {
  id: number;
  name: string;
  description: string;
  ownerId: number;
  teamMemberIds: number[];
}

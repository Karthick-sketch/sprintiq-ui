export class ProjectDTO {
  id: number = 0;
  name: string = '';
  description: string = '';
  ownerId: number | null = null;
  teamMemberIds: number[] | null = [];
}

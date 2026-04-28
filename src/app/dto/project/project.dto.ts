export class ProjectDTO {
  id: number = 0;
  title: string = '';
  description: string = '';
  ownerId: number | null = null;
  teamMemberIds: number[] | null = [];
}

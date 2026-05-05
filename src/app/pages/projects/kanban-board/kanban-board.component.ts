// import { Component, Input } from '@angular/core';
// import { FormsModule } from '@angular/forms';
// import { CdkDropListGroup } from '@angular/cdk/drag-drop';
// import { ProjectService } from '../../../services/project/project.service';
// import { SectionComponent } from './section/section.component';
// import { Section } from '../../../models/projects/section.model';
// import { ProjectDTO } from '../../../dto/project/project.dto';
// import { UserDTO } from '../../../dto/user/user.dto';
// import { ToastService } from '../../../services/toast/toast.service';

// @Component({
//   selector: 'app-kanban-board',
//   templateUrl: './kanban-board.component.html',
//   styleUrls: ['./kanban-board.component.css'],
//   imports: [SectionComponent, FormsModule, CdkDropListGroup],
// })
// export class KanbanBoardComponent {
//   @Input() project!: ProjectDTO;
//   @Input() users: UserDTO[] = [];

//   sections: Section[] = [];
//   isAddSectionClicked = false;
//   newSection: Section = new Section();

//   constructor(
//     private projectService: ProjectService,
//     private toastService: ToastService,
//   ) {}

//   ngOnInit(): void {
//     this.getSections();
//   }

//   getSections() {
//     this.projectService.getSections(this.project.id).subscribe((sections) => {
//       this.sections = sections.map((s) => ({
//         ...s,
//         tickets: s.tickets ?? [],
//       }));
//     });
//   }

//   enableAddSection() {
//     this.isAddSectionClicked = true;
//     this.newSection.title = `Section ${this.sections.length + 1}`;
//   }

//   closeAddSection() {
//     this.isAddSectionClicked = false;
//   }

//   addSection() {
//     if (!this.newSection.title) {
//       return;
//     }
//     this.newSection.projectId = this.project.id;
//     this.newSection.orderIndex = this.sections.length;
//     this.projectService.createSection(this.newSection).subscribe({
//       next: (section) => {
//         section.tickets = section.tickets ?? [];
//         this.sections.push(section);
//         this.closeAddSection();
//         this.toastService.success('Section created successfully.');
//       },
//       error: (error) => {
//         console.error('Error creating section:', error);
//         this.toastService.error('Unable to create section. Please try again.');
//       },
//     });
//   }
// }

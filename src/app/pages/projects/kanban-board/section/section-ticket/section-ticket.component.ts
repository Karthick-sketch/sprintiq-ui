// import { Component, Input } from '@angular/core';
// import { DatePipe } from '@angular/common';
// import { RouterLink } from '@angular/router';
// import { UserIconComponent } from '../../../../user/user-icon/user-icon.component';
// import { TicketStatus } from '../../../../../enums/ticket/ticket-status.enums';
// import { TicketPriority } from '../../../../../enums/ticket/ticket-priority.enums';
// import { TicketDTO } from '../../../../../dto/ticket/ticket.dto';
// import { ProjectDTO } from '../../../../../dto/project/project.dto';

// @Component({
//   selector: 'app-section-ticket',
//   templateUrl: './section-ticket.component.html',
//   styleUrls: ['./section-ticket.component.css'],
//   imports: [RouterLink, DatePipe, UserIconComponent],
// })
// export class SectionTicketComponent {
//   @Input() ticket!: TicketDTO;
//   @Input() project!: ProjectDTO;

//   getStatus(status: TicketStatus) {
//     switch (status) {
//       case TicketStatus.TODO:
//         return 'To Do';
//       case TicketStatus.IN_PROGRESS:
//         return 'In Progress';
//       case TicketStatus.DONE:
//         return 'Done';
//     }
//   }

//   getPriority(priority: TicketPriority) {
//     switch (priority) {
//       case TicketPriority.LOW:
//         return 'Low';
//       case TicketPriority.MEDIUM:
//         return 'Medium';
//       case TicketPriority.HIGH:
//         return 'High';
//       case TicketPriority.URGENT:
//         return 'Urgent';
//     }
//   }
// }

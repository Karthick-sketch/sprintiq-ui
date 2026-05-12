import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TitleCasePipe } from '@angular/common';
import { TicketCreateRequestDTO } from '../../../dto/ticket/ticket.dto';
import { ProjectDTO } from '../../../dto/project/project.dto';
import { SectionDTO } from '../../../dto/project/section.dto';
import { UserDTO } from '../../../dto/user/user.dto';
import { FieldService } from '../../../services/field/field.service';
import { FieldDTO, FieldOptionDTO } from '../../../dto/field/field.dto';
import { FieldType } from '../../../enums/fields/field-type.enums';

@Component({
  selector: 'app-ticket-form',
  templateUrl: './ticket-form.component.html',
  styleUrls: ['./ticket-form.component.css'],
  imports: [FormsModule, TitleCasePipe],
})
export class TicketFormComponent implements AfterViewInit, OnChanges {
  @Input() users: UserDTO[] = [];
  @Input() isSlideInPanelOpen: boolean = true;
  @Input() isInProject: boolean = false;
  @Input() projects: ProjectDTO[] = [];
  @Input() project!: ProjectDTO;

  @Output() ticketSlideInPanel = new EventEmitter<void>();
  @Output() ticketEvent = new EventEmitter<TicketCreateRequestDTO>();

  requiredFields: FieldDTO[] = [];
  ticket = new TicketCreateRequestDTO();
  sections: SectionDTO[] | null = null;

  initialized = false;

  fieldTypes = FieldType;

  constructor(private fieldService: FieldService) {}

  ngOnInit() {
    if (this.project?.id) {
      this.fieldService
        .getProjectFields(this.project.id)
        .subscribe((projectFields) => {
          // Map project fields to FieldDTO shape for template compatibility
          this.requiredFields = projectFields
            .filter(pf => pf.required)
            .map(pf => ({ id: pf.fieldId, name: pf.displayName || pf.name, fieldType: pf.fieldType, systemKey: pf.systemKey, active: pf.enabled, searchable: true, locked: false, system: false, options: pf.options } as any));
        });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => (this.initialized = true), 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['isSlideInPanelOpen']?.currentValue &&
      !changes['isSlideInPanelOpen'].firstChange
    ) {
      this.ticket = new TicketCreateRequestDTO();
    }
  }

  closeSlideInPanel() {
    this.isSlideInPanelOpen = false;
    this.ticket = new TicketCreateRequestDTO();
    this.ticketSlideInPanel.emit();
  }

  getFieldOptions(fieldId: number): FieldOptionDTO[] {
    let options: FieldOptionDTO[] = [];
    this.fieldService
      .getFieldOptionsByFieldId(fieldId)
      .subscribe((opts) => (options = opts));
    return options;
  }

  addTicket() {
    if (!this.validateTicket()) {
      return;
    }
    this.ticketEvent.emit(this.ticket);
  }

  private validateTicket() {
    if (!this.ticket.title) {
      return false;
    }
    if (!this.ticket.description) {
      return false;
    }
    for (const field of this.requiredFields) {
      const ticketField = this.ticket.fields.find(
        (f) => f.field.id === field.id,
      );
      if (!ticketField?.value) {
        return false;
      }
    }
    return true;
  }
}

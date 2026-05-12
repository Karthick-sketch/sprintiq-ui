import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  ProjectField,
  TicketFieldValue,
  TicketFieldValueRequest,
  TicketFieldValueItemRequest,
} from '../../models/field.models';
import { DynamicFieldRendererComponent } from '../dynamic-field-renderer/dynamic-field-renderer.component';

/**
 * Dynamic ticket form — builds a reactive FormGroup from ProjectField metadata
 * and existing TicketFieldValue data. Emits a save request on submit.
 */
@Component({
  selector: 'app-dynamic-ticket-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, DynamicFieldRendererComponent],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()" class="dynamic-form">
      <ng-container *ngFor="let field of enabledFields">
        <app-dynamic-field-renderer
          [field]="field"
          [formControlName]="field.projectFieldId.toString()"
        />
      </ng-container>

      <div class="form-actions">
        <button type="submit" class="btn-primary" [disabled]="form.invalid || saving">
          {{ saving ? 'Saving…' : 'Save' }}
        </button>
        <button type="button" class="btn-secondary" (click)="onCancel.emit()">Cancel</button>
      </div>
    </form>
  `,
  styles: [`
    .dynamic-form { display: flex; flex-direction: column; gap: 0.75rem; }
    .form-actions { display: flex; gap: 0.75rem; margin-top: 1rem; }
    .btn-primary {
      padding: 0.5rem 1.25rem; background: #6366f1; color: #fff;
      border: none; border-radius: 0.375rem; font-weight: 600; cursor: pointer;
      transition: background 0.15s;
    }
    .btn-primary:hover:not(:disabled) { background: #4f46e5; }
    .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn-secondary {
      padding: 0.5rem 1.25rem; background: transparent; color: #374151;
      border: 1px solid #d1d5db; border-radius: 0.375rem; cursor: pointer;
    }
  `],
})
export class DynamicTicketFormComponent implements OnInit, OnChanges {
  @Input() fields: ProjectField[] = [];
  @Input() existingValues: TicketFieldValue[] = [];
  @Input() saving = false;

  @Output() onSave = new EventEmitter<TicketFieldValueRequest[]>();
  @Output() onCancel = new EventEmitter<void>();

  form = new FormGroup({});

  get enabledFields(): ProjectField[] {
    return [...this.fields]
      .filter(f => f.enabled)
      .sort((a, b) => a.sortOrder - b.sortOrder);
  }

  ngOnInit(): void { this.buildForm(); }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields'] || changes['existingValues']) {
      this.buildForm();
    }
  }

  private buildForm(): void {
    const controls: Record<string, FormControl> = {};
    for (const field of this.enabledFields) {
      const key = field.projectFieldId.toString();
      const validators = field.required ? [Validators.required] : [];
      controls[key] = new FormControl(this.resolveInitialValue(field), validators);
    }
    this.form = new FormGroup(controls);
  }

  private resolveInitialValue(field: ProjectField): any {
    const existing = this.existingValues.find(
      v => v.projectFieldId === field.projectFieldId
    );
    if (!existing || existing.values.length === 0) return null;

    const first = existing.values[0];
    if (field.fieldType === 'MULTI_DROPDOWN' || field.fieldType === 'MULTI_USER') {
      return existing.values.map(v => v.fieldOptionId ?? v.userId);
    }
    return first.textValue ?? first.numberValue ?? first.dateValue ??
           first.booleanValue ?? first.fieldOptionId ?? first.userId ?? null;
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const requests: TicketFieldValueRequest[] = this.enabledFields
      .map(field => {
        const key = field.projectFieldId.toString();
        const rawVal = this.form.get(key)?.value;
        return {
          projectFieldId: field.projectFieldId,
          values: this.toValueItems(field, rawVal),
        };
      })
      .filter(r => r.values.length > 0);

    this.onSave.emit(requests);
  }

  private toValueItems(field: ProjectField, val: any): TicketFieldValueItemRequest[] {
    if (val === null || val === undefined || val === '') return [];

    const isMulti = field.fieldType === 'MULTI_DROPDOWN' || field.fieldType === 'MULTI_USER';
    const isUser = field.fieldType === 'USER' || field.fieldType === 'MULTI_USER';
    const isOption = field.fieldType === 'DROPDOWN' || field.fieldType === 'MULTI_DROPDOWN' ||
                     field.fieldType === 'RADIO';

    if (isMulti && Array.isArray(val)) {
      return val.map(id => isUser ? { userId: +id } : { fieldOptionId: +id });
    }
    if (isOption) return [{ fieldOptionId: +val }];
    if (isUser)   return [{ userId: +val }];
    if (field.fieldType === 'NUMBER')   return [{ numberValue: +val }];
    if (field.fieldType === 'DATE')     return [{ dateValue: val }];
    if (field.fieldType === 'DATETIME') return [{ datetimeValue: val }];
    if (field.fieldType === 'BOOLEAN' || field.fieldType === 'CHECKBOX')
      return [{ booleanValue: !!val }];
    return [{ textValue: String(val) }];
  }
}

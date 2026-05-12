import {
  Component,
  Input,
  OnInit,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProjectField, FieldOption } from '../../models/field.models';

/**
 * Dynamic field renderer — renders the correct input for any FieldType.
 * Implements ControlValueAccessor so it can be used with FormControl in DynamicTicketForm.
 */
@Component({
  selector: 'app-dynamic-field-renderer',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicFieldRendererComponent),
      multi: true,
    },
  ],
  template: `
    <div class="field-renderer" [class.required]="field.required">
      <label class="field-label">
        {{ field.displayName || field.name }}
        <span *ngIf="field.required" class="required-star">*</span>
      </label>
      <p *ngIf="field.helpText" class="field-help">{{ field.helpText }}</p>

      <ng-container [ngSwitch]="field.fieldType">

        <!-- TEXT -->
        <input *ngSwitchCase="'TEXT'"
          type="text" class="field-input"
          [value]="value" (input)="onChange($any($event.target).value)"
          [placeholder]="field.displayName || field.name" />

        <!-- TEXTAREA -->
        <textarea *ngSwitchCase="'TEXTAREA'"
          class="field-input field-textarea"
          [value]="value" (input)="onChange($any($event.target).value)"
          rows="3" [placeholder]="field.displayName || field.name"></textarea>

        <!-- NUMBER -->
        <input *ngSwitchCase="'NUMBER'"
          type="number" class="field-input"
          [value]="value" (input)="onChange(+$any($event.target).value)"
          [placeholder]="field.displayName || field.name" />

        <!-- DATE -->
        <input *ngSwitchCase="'DATE'"
          type="date" class="field-input"
          [value]="value" (change)="onChange($any($event.target).value)" />

        <!-- DATETIME -->
        <input *ngSwitchCase="'DATETIME'"
          type="datetime-local" class="field-input"
          [value]="value" (change)="onChange($any($event.target).value)" />

        <!-- URL -->
        <input *ngSwitchCase="'URL'"
          type="url" class="field-input"
          [value]="value" (input)="onChange($any($event.target).value)"
          [placeholder]="'https://...'" />

        <!-- BOOLEAN -->
        <label *ngSwitchCase="'BOOLEAN'" class="field-checkbox-label">
          <input type="checkbox"
            [checked]="value" (change)="onChange($any($event.target).checked)" />
          <span>{{ field.displayName || field.name }}</span>
        </label>

        <!-- CHECKBOX (same as boolean visually) -->
        <label *ngSwitchCase="'CHECKBOX'" class="field-checkbox-label">
          <input type="checkbox"
            [checked]="value" (change)="onChange($any($event.target).checked)" />
          <span>{{ field.displayName || field.name }}</span>
        </label>

        <!-- DROPDOWN -->
        <select *ngSwitchCase="'DROPDOWN'"
          class="field-input field-select"
          [value]="value" (change)="onChange(+$any($event.target).value)">
          <option value="" disabled selected>Select...</option>
          <option *ngFor="let opt of field.options" [value]="opt.id">
            <span *ngIf="opt.color" [style.color]="opt.color">● </span>
            {{ opt.label }}
          </option>
        </select>

        <!-- RADIO -->
        <div *ngSwitchCase="'RADIO'" class="field-radio-group">
          <label *ngFor="let opt of field.options" class="field-radio-label">
            <input type="radio" [value]="opt.id"
              [checked]="value === opt.id"
              (change)="onChange(opt.id)" />
            <span class="radio-dot" *ngIf="opt.color" [style.background]="opt.color"></span>
            {{ opt.label }}
          </label>
        </div>

        <!-- MULTI_DROPDOWN -->
        <select *ngSwitchCase="'MULTI_DROPDOWN'"
          class="field-input field-select"
          multiple
          (change)="onMultiChange($event)">
          <option *ngFor="let opt of field.options"
            [value]="opt.id"
            [selected]="isSelected(opt)">
            {{ opt.label }}
          </option>
        </select>

        <!-- USER (simplified — shows text input) -->
        <select *ngSwitchCase="'USER'"
          class="field-input field-select"
          [value]="value" (change)="onChange(+$any($event.target).value)">
          <option value="" disabled selected>Select user...</option>
          <option *ngFor="let opt of field.options" [value]="opt.id">
            {{ opt.label }}
          </option>
        </select>

        <!-- MULTI_USER -->
        <select *ngSwitchCase="'MULTI_USER'"
          class="field-input field-select"
          multiple
          (change)="onMultiChange($event)">
          <option *ngFor="let opt of field.options"
            [value]="opt.id"
            [selected]="isSelected(opt)">
            {{ opt.label }}
          </option>
        </select>

      </ng-container>
    </div>
  `,
  styles: [`
    .field-renderer { margin-bottom: 1rem; }
    .field-label { display: block; font-size: 0.85rem; font-weight: 600; color: #374151; margin-bottom: 0.25rem; }
    .required-star { color: #ef4444; margin-left: 2px; }
    .field-help { font-size: 0.75rem; color: #6b7280; margin: 0 0 0.25rem; }
    .field-input {
      width: 100%; padding: 0.5rem 0.75rem; border: 1px solid #d1d5db;
      border-radius: 0.375rem; font-size: 0.9rem; color: #111827;
      background: #fff; transition: border-color 0.15s;
    }
    .field-input:focus { outline: none; border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.15); }
    .field-textarea { resize: vertical; min-height: 80px; }
    .field-select { cursor: pointer; }
    .field-checkbox-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; }
    .field-radio-group { display: flex; flex-direction: column; gap: 0.375rem; }
    .field-radio-label { display: flex; align-items: center; gap: 0.5rem; cursor: pointer; font-size: 0.9rem; }
    .radio-dot { width: 10px; height: 10px; border-radius: 50%; display: inline-block; }
  `],
})
export class DynamicFieldRendererComponent implements ControlValueAccessor {
  @Input() field!: ProjectField;

  value: any = null;
  private onChangeFn: (val: any) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(val: any): void { this.value = val; }
  registerOnChange(fn: any): void { this.onChangeFn = fn; }
  registerOnTouched(fn: any): void { this.onTouched = fn; }

  onChange(val: any): void {
    this.value = val;
    this.onChangeFn(val);
  }

  onMultiChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const selected = Array.from(select.selectedOptions).map(o => +o.value);
    this.value = selected;
    this.onChangeFn(selected);
  }

  isSelected(opt: FieldOption): boolean {
    if (!Array.isArray(this.value)) return false;
    return this.value.includes(opt.id);
  }
}

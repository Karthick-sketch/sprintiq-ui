import {
  Component,
  Input,
  OnChanges,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  ProjectField,
  TicketSearchRequest,
  WorkflowSemanticKey,
  FieldFilter,
  FilterOperator,
} from '../../models/field.models';

interface PanelFilter {
  projectFieldId: number;
  systemKey?: string;
  fieldId?: number;
  fieldType: string;
  label: string;
  operator: FilterOperator;
  optionValueKeys: string[];
  textValue: string;
  numberValue: number | null;
}

/**
 * Dynamic filter panel — builds TicketSearchRequest from ProjectField metadata.
 * Emits the request whenever any filter changes.
 */
@Component({
  selector: 'app-dynamic-filter-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <aside class="filter-panel">
      <header class="filter-header">
        <span>Filters</span>
        <button class="clear-btn" (click)="clearAll()" *ngIf="hasActiveFilters">Clear all</button>
      </header>

      <!-- Workflow Semantic Filter -->
      <section class="filter-section">
        <h4 class="filter-section-title">Status (semantic)</h4>
        <div class="chip-group">
          <button *ngFor="let sk of semanticKeys"
            class="chip"
            [class.chip-active]="isSemanticActive(sk)"
            (click)="toggleSemantic(sk)">
            {{ sk | titlecase }}
          </button>
        </div>
      </section>

      <!-- Dynamic field filters -->
      <section class="filter-section" *ngFor="let field of filterableFields">
        <h4 class="filter-section-title">{{ field.displayName || field.name }}</h4>

        <!-- Option-based fields -->
        <ng-container *ngIf="isOptionField(field)">
          <div class="chip-group">
            <button *ngFor="let opt of field.options"
              class="chip"
              [class.chip-active]="isOptionActive(field, opt.valueKey)"
              (click)="toggleOption(field, opt.valueKey)"
              [style.border-color]="opt.color || ''"
              [style.color]="isOptionActive(field, opt.valueKey) ? '#fff' : opt.color || ''"
              [style.background-color]="isOptionActive(field, opt.valueKey) ? (opt.color || '#6366f1') : ''">
              {{ opt.label }}
            </button>
          </div>
        </ng-container>

        <!-- Text field -->
        <ng-container *ngIf="field.fieldType === 'TEXT' || field.fieldType === 'TEXTAREA'">
          <input class="filter-input" type="text"
            [placeholder]="'Search ' + (field.displayName || field.name)"
            [(ngModel)]="getFilter(field).textValue"
            (ngModelChange)="emitChange()" />
        </ng-container>

        <!-- Number field -->
        <ng-container *ngIf="field.fieldType === 'NUMBER'">
          <div class="number-filter">
            <input class="filter-input" type="number" placeholder="≥"
              [(ngModel)]="getFilter(field).numberValue"
              (ngModelChange)="emitChange()" />
          </div>
        </ng-container>
      </section>
    </aside>
  `,
  styles: [`
    .filter-panel {
      width: 240px; padding: 1rem;
      background: #fff; border-right: 1px solid #e5e7eb;
      display: flex; flex-direction: column; gap: 0;
    }
    .filter-header {
      display: flex; justify-content: space-between; align-items: center;
      font-weight: 700; font-size: 0.9rem; color: #111827; margin-bottom: 1rem;
    }
    .clear-btn { font-size: 0.75rem; color: #6366f1; background: none; border: none; cursor: pointer; }
    .filter-section { margin-bottom: 1.25rem; }
    .filter-section-title { font-size: 0.78rem; font-weight: 600; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 0.5rem; }
    .chip-group { display: flex; flex-wrap: wrap; gap: 0.375rem; }
    .chip {
      padding: 0.2rem 0.625rem; font-size: 0.78rem; border-radius: 9999px;
      border: 1.5px solid #d1d5db; background: #f9fafb; cursor: pointer;
      transition: all 0.15s; color: #374151;
    }
    .chip:hover { border-color: #6366f1; color: #6366f1; }
    .chip-active { background: #6366f1; border-color: #6366f1; color: #fff !important; }
    .filter-input {
      width: 100%; padding: 0.375rem 0.625rem; font-size: 0.85rem;
      border: 1px solid #d1d5db; border-radius: 0.375rem;
    }
    .filter-input:focus { outline: none; border-color: #6366f1; }
    .number-filter { display: flex; gap: 0.5rem; }
  `],
})
export class DynamicFilterPanelComponent implements OnChanges {
  @Input() fields: ProjectField[] = [];
  @Output() filterChange = new EventEmitter<TicketSearchRequest>();

  readonly semanticKeys: WorkflowSemanticKey[] = [
    'TODO', 'IN_PROGRESS', 'DONE', 'BLOCKED', 'CANCELLED',
  ];

  activeSemanticKeys = new Set<WorkflowSemanticKey>();
  private filterMap = new Map<number, PanelFilter>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['fields']) {
      // Seed filter map for new fields
      for (const f of this.fields) {
        if (!this.filterMap.has(f.projectFieldId)) {
          this.filterMap.set(f.projectFieldId, {
            projectFieldId: f.projectFieldId,
            systemKey: f.systemKey,
            fieldId: f.fieldId,
            fieldType: f.fieldType,
            label: f.displayName || f.name,
            operator: this.defaultOperator(f),
            optionValueKeys: [],
            textValue: '',
            numberValue: null,
          });
        }
      }
    }
  }

  get filterableFields(): ProjectField[] {
    // Exclude status (covered by semantic filter) and non-searchable types
    return this.fields.filter(
      f => f.enabled && f.systemKey !== 'status'
    );
  }

  get hasActiveFilters(): boolean {
    return this.activeSemanticKeys.size > 0 ||
      Array.from(this.filterMap.values()).some(
        f => f.optionValueKeys.length > 0 || !!f.textValue || f.numberValue !== null
      );
  }

  isSemanticActive(key: WorkflowSemanticKey): boolean {
    return this.activeSemanticKeys.has(key);
  }

  toggleSemantic(key: WorkflowSemanticKey): void {
    if (this.activeSemanticKeys.has(key)) {
      this.activeSemanticKeys.delete(key);
    } else {
      this.activeSemanticKeys.add(key);
    }
    this.emitChange();
  }

  isOptionField(field: ProjectField): boolean {
    return ['DROPDOWN', 'MULTI_DROPDOWN', 'RADIO'].includes(field.fieldType);
  }

  isOptionActive(field: ProjectField, valueKey: string): boolean {
    return this.getFilter(field).optionValueKeys.includes(valueKey);
  }

  toggleOption(field: ProjectField, valueKey: string): void {
    const f = this.getFilter(field);
    const idx = f.optionValueKeys.indexOf(valueKey);
    if (idx >= 0) {
      f.optionValueKeys.splice(idx, 1);
    } else {
      f.optionValueKeys.push(valueKey);
    }
    this.emitChange();
  }

  getFilter(field: ProjectField): PanelFilter {
    return this.filterMap.get(field.projectFieldId)!;
  }

  clearAll(): void {
    this.activeSemanticKeys.clear();
    for (const f of this.filterMap.values()) {
      f.optionValueKeys = [];
      f.textValue = '';
      f.numberValue = null;
    }
    this.emitChange();
  }

  emitChange(): void {
    const fieldFilters: FieldFilter[] = [];
    for (const f of this.filterMap.values()) {
      if (f.optionValueKeys.length > 0) {
        fieldFilters.push({
          systemKey: f.systemKey,
          fieldId: f.systemKey ? undefined : f.fieldId,
          operator: 'IN_OPTIONS',
          optionValueKeys: [...f.optionValueKeys],
        });
      } else if (f.textValue) {
        fieldFilters.push({
          systemKey: f.systemKey,
          fieldId: f.systemKey ? undefined : f.fieldId,
          operator: 'TEXT_CONTAINS',
          textValue: f.textValue,
        });
      } else if (f.numberValue !== null && f.numberValue !== undefined) {
        fieldFilters.push({
          systemKey: f.systemKey,
          fieldId: f.systemKey ? undefined : f.fieldId,
          operator: 'NUMBER_GTE',
          numberValue: f.numberValue,
        });
      }
    }

    this.filterChange.emit({
      workflowSemanticKeys: Array.from(this.activeSemanticKeys),
      fieldFilters,
    });
  }

  private defaultOperator(field: ProjectField): FilterOperator {
    if (['DROPDOWN', 'MULTI_DROPDOWN', 'RADIO'].includes(field.fieldType)) return 'IN_OPTIONS';
    if (field.fieldType === 'NUMBER') return 'NUMBER_GTE';
    return 'TEXT_CONTAINS';
  }
}

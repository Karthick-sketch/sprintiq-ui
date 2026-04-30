import { Component } from '@angular/core';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
} from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

type FieldKind = 'standard' | 'custom';
type FieldType =
  | 'text'
  | 'textarea'
  | 'number'
  | 'url'
  | 'user'
  | 'user-multi'
  | 'dropdown'
  | 'multi-dropdown'
  | 'date';
type AssignmentScope = 'global' | 'project' | 'section';

interface FieldOption {
  id: number;
  label: string;
  value: string;
  inUseCount: number;
}

interface FieldConfig {
  id: number;
  key: string;
  name: string;
  description: string;
  kind: FieldKind;
  type: FieldType;
  enabled: boolean;
  required: boolean;
  defaultValue?: string | number | string[];
  charLimit?: number;
  min?: number;
  max?: number;
  assignmentScope: AssignmentScope;
  assignmentTarget?: string;
  options?: FieldOption[];
  protected?: boolean;
}

interface FieldDraft {
  id?: number;
  name: string;
  description: string;
  type: FieldType;
  required: boolean;
  defaultValue: string;
  charLimit?: number;
  min?: number;
  max?: number;
  assignmentScope: AssignmentScope;
  assignmentTarget: string;
  options: FieldOption[];
}

@Component({
  selector: 'app-fields',
  imports: [FormsModule, DragDropModule],
  templateUrl: './fields.component.html',
  styleUrl: './fields.component.css',
})
export class FieldsComponent {
  activeTab: FieldKind = 'standard';
  selectedFieldId = 1;
  isCustomPanelOpen = false;
  optionDraft = '';
  customOptionDraft = '';

  readonly fieldTypes: { value: FieldType; label: string }[] = [
    { value: 'text', label: 'Text' },
    { value: 'number', label: 'Number' },
    { value: 'url', label: 'URL' },
    { value: 'user', label: 'User selector' },
    { value: 'user-multi', label: 'User selector (multiple)' },
    { value: 'dropdown', label: 'Dropdown' },
    { value: 'multi-dropdown', label: 'Multi-dropdown' },
  ];

  readonly projects = ['SprintIQ Platform', 'Mobile App', 'Customer Portal'];
  readonly sections = ['Backlog', 'In Progress', 'QA Review', 'Released'];
  readonly users = ['Aarav Patel', 'Maya Singh', 'Nina Rao', 'Vikram Iyer'];

  standardFields: FieldConfig[] = [
    {
      id: 1,
      key: 'title',
      name: 'Title',
      description: 'Primary summary displayed in ticket lists and boards.',
      kind: 'standard',
      type: 'text',
      enabled: true,
      required: true,
      charLimit: 140,
      assignmentScope: 'global',
      protected: true,
    },
    {
      id: 2,
      key: 'description',
      name: 'Description',
      description: 'Long-form ticket details, acceptance notes, and context.',
      kind: 'standard',
      type: 'textarea',
      enabled: true,
      required: true,
      charLimit: 4000,
      assignmentScope: 'global',
      protected: true,
    },
    {
      id: 3,
      key: 'status',
      name: 'Status',
      description: 'Workflow state used by ticket boards and reporting.',
      kind: 'standard',
      type: 'dropdown',
      enabled: true,
      required: true,
      defaultValue: 'To Do',
      assignmentScope: 'global',
      options: [
        this.createOption('To Do', 18),
        this.createOption('In Progress', 11),
        this.createOption('Done', 27),
      ],
    },
    {
      id: 4,
      key: 'priority',
      name: 'Priority',
      description: 'Relative urgency used for planning and triage.',
      kind: 'standard',
      type: 'dropdown',
      enabled: true,
      required: false,
      defaultValue: 'Medium',
      assignmentScope: 'global',
      options: [
        this.createOption('Low', 4),
        this.createOption('Medium', 16),
        this.createOption('High', 9),
        this.createOption('Urgent', 2),
      ],
    },
    {
      id: 5,
      key: 'assignee',
      name: 'Assignee',
      description: 'User responsible for the next action on the ticket.',
      kind: 'standard',
      type: 'user',
      enabled: true,
      required: false,
      assignmentScope: 'global',
    },
    {
      id: 6,
      key: 'dueDate',
      name: 'Due Date',
      description: 'Target completion date used for reminders and reports.',
      kind: 'standard',
      type: 'date',
      enabled: true,
      required: false,
      assignmentScope: 'global',
    },
  ];

  customFields: FieldConfig[] = [
    {
      id: 101,
      key: 'customer-impact',
      name: 'Customer Impact',
      description: 'Captures which customer segment is affected.',
      kind: 'custom',
      type: 'dropdown',
      enabled: true,
      required: true,
      defaultValue: 'Internal',
      assignmentScope: 'project',
      assignmentTarget: 'Customer Portal',
      options: [
        this.createOption('Internal', 7),
        this.createOption('Enterprise', 3),
        this.createOption('Self-serve', 0),
      ],
    },
    {
      id: 102,
      key: 'story-points',
      name: 'Story Points',
      description: 'Relative delivery estimate for planning.',
      kind: 'custom',
      type: 'number',
      enabled: true,
      required: false,
      defaultValue: 3,
      min: 1,
      max: 13,
      assignmentScope: 'section',
      assignmentTarget: 'Backlog',
    },
  ];

  fieldDraft: FieldDraft = this.createEmptyDraft();

  get fields(): FieldConfig[] {
    return this.activeTab === 'standard'
      ? this.standardFields
      : this.customFields;
  }

  get selectedField(): FieldConfig {
    return (
      this.fields.find((field) => field.id === this.selectedFieldId) ??
      this.fields[0] ??
      this.standardFields[0]
    );
  }

  get enabledStandardCount(): number {
    return this.standardFields.filter((field) => field.enabled).length;
  }

  get requiredFieldsCount(): number {
    return [...this.standardFields, ...this.customFields].filter(
      (field) => field.enabled && field.required,
    ).length;
  }

  get dropdownFieldsCount(): number {
    return [...this.standardFields, ...this.customFields].filter((field) =>
      this.hasOptions(field),
    ).length;
  }

  get activeCustomCount(): number {
    return this.customFields.filter((field) => field.enabled).length;
  }

  get visibleTicketFields(): FieldConfig[] {
    return [...this.standardFields, ...this.customFields].filter(
      (field) => field.enabled,
    );
  }

  setActiveTab(tab: FieldKind): void {
    this.activeTab = tab;
    this.selectedFieldId = this.fields[0]?.id ?? 0;
    this.optionDraft = '';
  }

  selectField(field: FieldConfig): void {
    this.selectedFieldId = field.id;
    this.optionDraft = '';
  }

  toggleEnabled(field: FieldConfig): void {
    field.enabled = !field.enabled;
    if (!field.enabled) {
      field.required = false;
    }
  }

  toggleRequired(field: FieldConfig): void {
    if (!field.enabled) {
      return;
    }
    field.required = !field.required;
  }

  hasOptions(field: FieldConfig | FieldDraft): boolean {
    return field.type === 'dropdown' || field.type === 'multi-dropdown';
  }

  optionList(field: FieldConfig | FieldDraft): FieldOption[] {
    return field.options ?? [];
  }

  addOption(field: FieldConfig, label: string): void {
    const nextLabel = label.trim();
    if (!nextLabel || !field.options) {
      return;
    }

    field.options = [...field.options, this.createOption(nextLabel, 0)];
    this.optionDraft = '';
  }

  updateOption(option: FieldOption, label: string): void {
    const nextLabel = label.trim();
    if (!nextLabel) {
      return;
    }

    option.label = nextLabel;
    option.value = this.toValue(nextLabel);
  }

  deleteOption(field: FieldConfig, option: FieldOption): void {
    if (option.inUseCount > 0 || !field.options) {
      return;
    }

    field.options = field.options.filter((item) => item.id !== option.id);
  }

  moveOption(field: FieldConfig, index: number, direction: -1 | 1): void {
    if (!field.options) {
      return;
    }

    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= field.options.length) {
      return;
    }

    const options = [...field.options];
    [options[index], options[nextIndex]] = [options[nextIndex], options[index]];
    field.options = options;
  }

  dropOption(field: FieldConfig, event: CdkDragDrop<FieldOption[]>): void {
    const options = [...this.optionList(field)];
    moveItemInArray(options, event.previousIndex, event.currentIndex);
    field.options = options;
  }

  openCreateCustomPanel(): void {
    this.fieldDraft = this.createEmptyDraft();
    this.customOptionDraft = '';
    this.isCustomPanelOpen = true;
  }

  openEditCustomPanel(field: FieldConfig): void {
    this.fieldDraft = {
      id: field.id,
      name: field.name,
      description: field.description,
      type: field.type,
      required: field.required,
      defaultValue: Array.isArray(field.defaultValue)
        ? field.defaultValue.join(', ')
        : String(field.defaultValue ?? ''),
      charLimit: field.charLimit,
      min: field.min,
      max: field.max,
      assignmentScope: field.assignmentScope,
      assignmentTarget: field.assignmentTarget ?? '',
      options: field.options?.map((option) => ({ ...option })) ?? [],
    };
    this.customOptionDraft = '';
    this.isCustomPanelOpen = true;
  }

  closeCustomPanel(): void {
    this.isCustomPanelOpen = false;
    this.fieldDraft = this.createEmptyDraft();
  }

  saveCustomField(): void {
    const name = this.fieldDraft.name.trim();
    if (!name) {
      return;
    }

    const nextField: FieldConfig = {
      id: this.fieldDraft.id ?? Date.now(),
      key: this.fieldDraft.id
        ? this.toValue(name)
        : `${this.toValue(name)}-${Date.now()}`,
      name,
      description: this.fieldDraft.description.trim(),
      kind: 'custom',
      type: this.fieldDraft.type,
      enabled: true,
      required: this.fieldDraft.required,
      defaultValue: this.normalizeDefaultValue(this.fieldDraft),
      charLimit:
        this.fieldDraft.type === 'text' ? this.fieldDraft.charLimit : undefined,
      min: this.fieldDraft.type === 'number' ? this.fieldDraft.min : undefined,
      max: this.fieldDraft.type === 'number' ? this.fieldDraft.max : undefined,
      assignmentScope: this.fieldDraft.assignmentScope,
      assignmentTarget:
        this.fieldDraft.assignmentScope === 'global'
          ? undefined
          : this.fieldDraft.assignmentTarget,
      options: this.hasOptions(this.fieldDraft)
        ? this.fieldDraft.options
        : undefined,
    };

    if (this.fieldDraft.id) {
      this.customFields = this.customFields.map((field) =>
        field.id === this.fieldDraft.id ? nextField : field,
      );
    } else {
      this.customFields = [...this.customFields, nextField];
    }

    this.activeTab = 'custom';
    this.selectedFieldId = nextField.id;
    this.closeCustomPanel();
  }

  deleteCustomField(field: FieldConfig): void {
    this.customFields = this.customFields.filter(
      (item) => item.id !== field.id,
    );
    this.selectedFieldId =
      this.customFields[0]?.id ?? this.standardFields[0].id;
  }

  addDraftOption(label: string): void {
    const nextLabel = label.trim();
    if (!nextLabel) {
      return;
    }

    this.fieldDraft.options = [
      ...this.fieldDraft.options,
      this.createOption(nextLabel, 0),
    ];
    this.customOptionDraft = '';
  }

  deleteDraftOption(option: FieldOption): void {
    this.fieldDraft.options = this.fieldDraft.options.filter(
      (item) => item.id !== option.id,
    );
  }

  updateDraftOption(option: FieldOption, label: string): void {
    const nextLabel = label.trim();
    if (!nextLabel) {
      return;
    }

    option.label = nextLabel;
    option.value = this.toValue(nextLabel);
  }

  moveDraftOption(index: number, direction: -1 | 1): void {
    const nextIndex = index + direction;
    if (nextIndex < 0 || nextIndex >= this.fieldDraft.options.length) {
      return;
    }

    const options = [...this.fieldDraft.options];
    [options[index], options[nextIndex]] = [options[nextIndex], options[index]];
    this.fieldDraft.options = options;
  }

  dropDraftOption(event: CdkDragDrop<FieldOption[]>): void {
    const options = [...this.fieldDraft.options];
    moveItemInArray(options, event.previousIndex, event.currentIndex);
    this.fieldDraft.options = options;
  }

  onDraftTypeChange(): void {
    if (!this.hasOptions(this.fieldDraft)) {
      this.fieldDraft.options = [];
    }
  }

  assignmentTargets(scope: AssignmentScope): string[] {
    if (scope === 'project') {
      return this.projects;
    }

    if (scope === 'section') {
      return this.sections;
    }

    return [];
  }

  inputType(field: FieldConfig): string {
    if (field.type === 'number') {
      return 'number';
    }

    if (field.type === 'url') {
      return 'url';
    }

    if (field.type === 'date') {
      return 'date';
    }

    return 'text';
  }

  defaultValueText(field: FieldConfig): string {
    if (Array.isArray(field.defaultValue)) {
      return field.defaultValue.join(', ');
    }

    return String(field.defaultValue ?? '');
  }

  previewPlaceholder(field: FieldConfig): string {
    return this.defaultValueText(field) || field.description;
  }

  fieldTypeLabel(type: FieldType): string {
    const match = this.fieldTypes.find((item) => item.value === type);
    const labels: Partial<Record<FieldType, string>> = {
      textarea: 'Long text',
      date: 'Date',
    };

    return match?.label ?? labels[type] ?? type;
  }

  private createEmptyDraft(): FieldDraft {
    return {
      name: '',
      description: '',
      type: 'text',
      required: false,
      defaultValue: '',
      assignmentScope: 'global',
      assignmentTarget: '',
      options: [],
    };
  }

  private createOption(label: string, inUseCount = 0): FieldOption {
    return {
      id: Date.now() + Math.floor(Math.random() * 10000),
      label,
      value: this.toValue(label),
      inUseCount,
    };
  }

  private normalizeDefaultValue(draft: FieldDraft): string | number | string[] {
    if (draft.type === 'number') {
      return Number(draft.defaultValue || 0);
    }

    if (draft.type === 'multi-dropdown' || draft.type === 'user-multi') {
      return draft.defaultValue
        .split(',')
        .map((value) => value.trim())
        .filter(Boolean);
    }

    return draft.defaultValue.trim();
  }

  private toValue(label: string): string {
    return label
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }
}

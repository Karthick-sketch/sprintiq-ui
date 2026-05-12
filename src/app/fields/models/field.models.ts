export type FieldKind = 'STANDARD' | 'CUSTOM';

export type FieldType =
  | 'TEXT'
  | 'TEXTAREA'
  | 'NUMBER'
  | 'DATE'
  | 'DATETIME'
  | 'URL'
  | 'DROPDOWN'
  | 'MULTI_DROPDOWN'
  | 'USER'
  | 'MULTI_USER'
  | 'CHECKBOX'
  | 'RADIO'
  | 'BOOLEAN';

export type WorkflowSemanticKey =
  | 'TODO'
  | 'IN_PROGRESS'
  | 'DONE'
  | 'BLOCKED'
  | 'CANCELLED';

export interface FieldOption {
  id: number;
  fieldId?: number;
  label: string;
  valueKey: string;
  color?: string;
  icon?: string;
  sortOrder: number;
  workflowSemanticKey?: WorkflowSemanticKey;
  defaultOption: boolean;
  active: boolean;
}

export interface Field {
  id: number;
  systemKey?: string;
  name: string;
  description?: string;
  fieldKind: FieldKind;
  fieldType: FieldType;
  system: boolean;
  locked: boolean;
  searchable: boolean;
  active: boolean;
  options: FieldOption[];
}

export interface ProjectField {
  projectFieldId: number;
  fieldId: number;
  systemKey?: string;
  name: string;
  displayName?: string;
  helpText?: string;
  fieldType: FieldType;
  sortOrder: number;
  enabled: boolean;
  required: boolean;
  useGlobalOptions: boolean;
  options: FieldOption[];
}

export interface TicketFieldValueItem {
  textValue?: string;
  numberValue?: number;
  dateValue?: string;       // ISO date string
  datetimeValue?: string;   // ISO datetime string
  booleanValue?: boolean;
  fieldOptionId?: number;
  projectFieldOptionId?: number;
  userId?: number;
  // Resolved display data (read-only)
  optionLabel?: string;
  optionValueKey?: string;
  optionColor?: string;
  workflowSemanticKey?: WorkflowSemanticKey;
  userName?: string;
}

export interface TicketFieldValue {
  projectFieldId: number;
  systemKey?: string;
  displayName?: string;
  fieldType: FieldType;
  values: TicketFieldValueItem[];
}

export interface TicketFieldValueRequest {
  projectFieldId: number;
  values: TicketFieldValueItemRequest[];
}

export interface TicketFieldValueItemRequest {
  textValue?: string;
  numberValue?: number;
  dateValue?: string;
  datetimeValue?: string;
  booleanValue?: boolean;
  fieldOptionId?: number;
  projectFieldOptionId?: number;
  userId?: number;
}

export interface TicketSearchRequest {
  projectIds?: number[];
  workflowSemanticKeys?: WorkflowSemanticKey[];
  fieldFilters?: FieldFilter[];
  page?: number;
  size?: number;
  sort?: SortSpec[];
}

export interface FieldFilter {
  systemKey?: string;
  fieldId?: number;
  operator: FilterOperator;
  optionValueKeys?: string[];
  userIds?: number[];
  numberValue?: number;
  textValue?: string;
}

export type FilterOperator =
  | 'IN_OPTIONS'
  | 'NOT_IN_OPTIONS'
  | 'IN_USERS'
  | 'TEXT_CONTAINS'
  | 'NUMBER_EQ'
  | 'NUMBER_GTE'
  | 'NUMBER_LTE'
  | 'DATE_ON'
  | 'DATE_AFTER'
  | 'DATE_BEFORE'
  | 'IS_EMPTY'
  | 'IS_NOT_EMPTY';

export interface SortSpec {
  field: string;
  direction: 'ASC' | 'DESC';
}

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  number: number;
  size: number;
}

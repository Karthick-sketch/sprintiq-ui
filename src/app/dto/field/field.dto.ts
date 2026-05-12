import { FieldType } from '../../enums/fields/field-type.enums';
import { WorkflowSemanticKey } from '../../enums/fields/workflow-semantic-key.enums';

export class FieldOptionDTO {
  id: number = 0;
  fieldId?: number;
  label: string = '';
  valueKey: string = '';
  color?: string;
  icon?: string;
  sortOrder: number = 0;
  workflowSemanticKey?: WorkflowSemanticKey;
  defaultOption: boolean = false;
  active: boolean = true;
}

export class FieldDTO {
  id: number = 0;
  systemKey?: string;
  name: string = '';
  description?: string;
  fieldKind?: 'STANDARD' | 'CUSTOM';
  fieldType: FieldType = FieldType.TEXT;
  system: boolean = false;
  locked: boolean = false;
  searchable: boolean = true;
  active: boolean = true;
  options: FieldOptionDTO[] = [];
}

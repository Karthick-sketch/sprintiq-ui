import { FieldType } from '../../enums/fields/field-type.enums';
import { FieldOptionDTO } from './field.dto';

export class ProjectFieldResponse {
  projectFieldId: number = 0;
  fieldId: number = 0;
  systemKey?: string;
  name: string = '';
  displayName?: string;
  helpText?: string;
  fieldType: FieldType = FieldType.TEXT;
  sortOrder: number = 0;
  enabled: boolean = true;
  required: boolean = false;
  useGlobalOptions: boolean = true;
  options: FieldOptionDTO[] = [];
}

import { FieldType } from '../../enums/fields/field-type.enums';

export class FieldDTO {
  id: number = 0;
  name: string = '';
  type: FieldType = FieldType.TEXT;
}

export class FieldOptionDTO {
  id: number = 0;
  fieldId: number = 0;
  value: string = '';
  orderIndex: number = 0;
  colorNumber: number = 0;
}

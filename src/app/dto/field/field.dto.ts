import { FieldType } from '../../enums/fields/field-type.enums';

export class FieldDTO {
  id: number = 0;
  name: string = '';
  type: FieldType = FieldType.TEXT;
}

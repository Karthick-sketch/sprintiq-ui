import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldDTO, FieldOptionDTO } from '../../dto/field/field.dto';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  private readonly baseUrl = '/api/fields';

  constructor(private http: HttpClient) {}

  getAllFieldOptions(): Observable<FieldOptionDTO[]> {
    return this.http.get<FieldOptionDTO[]>(`${this.baseUrl}/options`);
  }

  getFieldOptionsByFieldId(fieldId: number): Observable<FieldOptionDTO[]> {
    return this.http.get<FieldOptionDTO[]>(
      `${this.baseUrl}/options/${fieldId}`,
    );
  }

  getRequiredFieldsByProjectId(id: number): Observable<FieldDTO[]> {
    return this.http.get<FieldDTO[]>(`${this.baseUrl}/required/${id}`);
  }
}

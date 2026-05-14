import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldDTO, FieldOptionDTO } from '../../dto/field/field.dto';
import { ProjectFieldResponse } from '../../dto/field/project-field-response.dto';
import {FilterFieldOptionsDTO} from '../../dto/field/filter-field-options.dto';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  private readonly baseUrl = '/api/fields';

  constructor(private http: HttpClient) {}

  getAllFields(kind?: string, active?: boolean): Observable<FieldDTO[]> {
    let url = this.baseUrl;
    const params: string[] = [];
    if (kind) params.push(`kind=${kind}`);
    if (active !== undefined) params.push(`active=${active}`);
    if (params.length) url += '?' + params.join('&');
    return this.http.get<FieldDTO[]>(url);
  }

  getFieldOptionsByFieldId(fieldId: number): Observable<FieldOptionDTO[]> {
    return this.http.get<FieldOptionDTO[]>(`${this.baseUrl}/${fieldId}/options`);
  }

  getFilterFieldOptions() {
    return this.http.get<FilterFieldOptionsDTO>(`${this.baseUrl}/filter`);
  }

  createField(field: Partial<FieldDTO>): Observable<FieldDTO> {
    return this.http.post<FieldDTO>(this.baseUrl, field);
  }

  updateField(fieldId: number, field: Partial<FieldDTO>): Observable<FieldDTO> {
    return this.http.patch<FieldDTO>(`${this.baseUrl}/${fieldId}`, field);
  }

  deactivateField(fieldId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${fieldId}`);
  }

  addFieldOption(fieldId: number, option: Partial<FieldOptionDTO>): Observable<FieldOptionDTO> {
    return this.http.post<FieldOptionDTO>(`${this.baseUrl}/${fieldId}/options`, option);
  }

  updateFieldOption(fieldId: number, optionId: number, option: Partial<FieldOptionDTO>): Observable<FieldOptionDTO> {
    return this.http.patch<FieldOptionDTO>(`${this.baseUrl}/${fieldId}/options/${optionId}`, option);
  }

  reorderFieldOptions(fieldId: number, orderedIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}/${fieldId}/options/reorder`, orderedIds);
  }

  getProjectFields(projectId: number): Observable<ProjectFieldResponse[]> {
    return this.http.get<ProjectFieldResponse[]>(`/api/projects/${projectId}/fields`);
  }

  applyDefaultTemplate(projectId: number): Observable<void> {
    return this.http.post<void>(`/api/field-templates/apply-default/${projectId}`, {});
  }
}

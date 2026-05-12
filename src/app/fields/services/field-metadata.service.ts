import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import {
  Field,
  FieldOption,
  FieldKind,
  ProjectField,
} from '../models/field.models';

/**
 * Field metadata service with per-project caching.
 * Invalidate cache on field config changes via clearCache(projectId).
 */
@Injectable({ providedIn: 'root' })
export class FieldMetadataService {
  private readonly baseUrl = '/api/fields';
  private readonly projectFieldsUrl = (id: number) =>
    `/api/projects/${id}/fields`;

  /** Per-project cache keyed by project ID */
  private projectFieldsCache = new Map<number, ProjectField[]>();
  /** Global field cache */
  private globalFieldsCache: Field[] | null = null;

  constructor(private http: HttpClient) {}

  // ── Global Fields ──────────────────────────────────────────────────────────

  getGlobalFields(kind?: FieldKind, active?: boolean): Observable<Field[]> {
    if (!kind && active === undefined && this.globalFieldsCache) {
      return of(this.globalFieldsCache);
    }
    let params = new HttpParams();
    if (kind) params = params.set('kind', kind);
    if (active !== undefined) params = params.set('active', String(active));

    return this.http
      .get<Field[]>(this.baseUrl, { params })
      .pipe(tap(fields => { if (!kind && active === undefined) this.globalFieldsCache = fields; }));
  }

  createField(field: Partial<Field>): Observable<Field> {
    this.globalFieldsCache = null;
    return this.http.post<Field>(this.baseUrl, field);
  }

  updateField(fieldId: number, field: Partial<Field>): Observable<Field> {
    this.globalFieldsCache = null;
    return this.http.patch<Field>(`${this.baseUrl}/${fieldId}`, field);
  }

  deactivateField(fieldId: number): Observable<void> {
    this.globalFieldsCache = null;
    return this.http.delete<void>(`${this.baseUrl}/${fieldId}`);
  }

  addFieldOption(fieldId: number, option: Partial<FieldOption>): Observable<FieldOption> {
    this.globalFieldsCache = null;
    return this.http.post<FieldOption>(`${this.baseUrl}/${fieldId}/options`, option);
  }

  updateFieldOption(
    fieldId: number,
    optionId: number,
    option: Partial<FieldOption>
  ): Observable<FieldOption> {
    this.globalFieldsCache = null;
    return this.http.patch<FieldOption>(
      `${this.baseUrl}/${fieldId}/options/${optionId}`,
      option
    );
  }

  reorderFieldOptions(fieldId: number, orderedIds: number[]): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/${fieldId}/options/reorder`,
      orderedIds
    );
  }

  // ── Project Fields ─────────────────────────────────────────────────────────

  getProjectFields(projectId: number): Observable<ProjectField[]> {
    if (this.projectFieldsCache.has(projectId)) {
      return of(this.projectFieldsCache.get(projectId)!);
    }
    return this.http
      .get<ProjectField[]>(this.projectFieldsUrl(projectId))
      .pipe(tap(fields => this.projectFieldsCache.set(projectId, fields)));
  }

  assignFieldToProject(projectId: number, request: object): Observable<ProjectField> {
    this.clearCache(projectId);
    return this.http.post<ProjectField>(this.projectFieldsUrl(projectId), request);
  }

  updateProjectField(
    projectId: number,
    projectFieldId: number,
    request: object
  ): Observable<ProjectField> {
    this.clearCache(projectId);
    return this.http.patch<ProjectField>(
      `${this.projectFieldsUrl(projectId)}/${projectFieldId}`,
      request
    );
  }

  reorderProjectFields(projectId: number, orderedIds: number[]): Observable<void> {
    this.clearCache(projectId);
    return this.http.put<void>(
      `${this.projectFieldsUrl(projectId)}/reorder`,
      orderedIds
    );
  }

  addProjectFieldOption(
    projectId: number,
    projectFieldId: number,
    option: Partial<FieldOption>
  ): Observable<FieldOption> {
    this.clearCache(projectId);
    return this.http.post<FieldOption>(
      `${this.projectFieldsUrl(projectId)}/${projectFieldId}/options`,
      option
    );
  }

  // ── Templates ──────────────────────────────────────────────────────────────

  applyDefaultTemplate(projectId: number): Observable<void> {
    return this.http.post<void>(
      `/api/field-templates/apply-default/${projectId}`,
      {}
    );
  }

  applyTemplate(templateId: number, projectId: number): Observable<void> {
    return this.http.post<void>(
      `/api/field-templates/${templateId}/apply/${projectId}`,
      {}
    );
  }

  // ── Cache ─────────────────────────────────────────────────────────────────

  clearCache(projectId?: number): void {
    if (projectId !== undefined) {
      this.projectFieldsCache.delete(projectId);
    } else {
      this.projectFieldsCache.clear();
      this.globalFieldsCache = null;
    }
  }
}

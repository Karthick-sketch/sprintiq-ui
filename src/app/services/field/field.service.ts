import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FieldOptionDTO } from '../../dto/field/field.dto';

@Injectable({
  providedIn: 'root',
})
export class FieldService {
  private readonly baseUrl = '/api/fields';

  constructor(private http: HttpClient) {}

  getAllFieldOptions(): Observable<FieldOptionDTO[]> {
    return this.http.get<FieldOptionDTO[]>(`${this.baseUrl}/options`);
  }
}

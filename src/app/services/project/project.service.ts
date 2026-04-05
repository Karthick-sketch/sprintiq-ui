import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../models/projects/project.model';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  getProjects() {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProject(id: number) {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }
}

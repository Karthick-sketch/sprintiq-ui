import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Project } from '../../models/projects/project.model';
import { Section } from '../../models/projects/section.model';
import { ProjectDTO } from '../../dto/project/project.dto';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private baseUrl = '/api/projects';

  constructor(private http: HttpClient) {}

  // projects
  getProjects() {
    return this.http.get<Project[]>(this.baseUrl);
  }

  getProject(id: number) {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  createProject(projectDTO: ProjectDTO) {
    return this.http.post<Project>(this.baseUrl, projectDTO);
  }

  updateProject(project: Project) {
    return this.http.put<Project>(`${this.baseUrl}/${project.id}`, project);
  }

  deleteProject(id: number) {
    return this.http.delete<Project>(`${this.baseUrl}/${id}`);
  }

  // sections
  getSections(projectId: number) {
    return this.http.get<Section[]>(`${this.baseUrl}/${projectId}/sections`);
  }

  createSection(section: Section) {
    return this.http.post<Section>(
      `${this.baseUrl}/${section.projectId}/sections`,
      section,
    );
  }

  updateSection(section: Section) {
    return this.http.put<Section>(
      `${this.baseUrl}/${section.projectId}/sections/${section.id}`,
      section,
    );
  }

  deleteSection(section: Section) {
    return this.http.delete<Section>(
      `${this.baseUrl}/${section.projectId}/sections/${section.id}`,
    );
  }
}

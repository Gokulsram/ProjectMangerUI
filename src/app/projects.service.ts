import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProject } from './Interface/IProject';

@Injectable()
export class ProjectsService {

  //baseUrl: string = 'http://localhost:52781/api/';
  baseUrl: string = 'http://172.18.4.6/ProjectManagerAPI/api/';

  constructor(private http: HttpClient) { }

  getAllProjects(): Observable<IProject[]> {
    return this.http.get<IProject[]>(this.baseUrl + 'GetAllProjects')
      .pipe();
  }

  addProject(project: any) {
    return this.http.post(this.baseUrl + 'AddProject', project);
  }

  getProjectById(projectid: number): Observable<IProject> {
    return this.http.get<IProject>(this.baseUrl + 'GetProjectById?intProjectId=' + projectid)
      .pipe();
  }

  EditProject(project: any) {
    return this.http.put(this.baseUrl + 'EditProject', project);
  }

  deleteProject(projectid: any) {
    return this.http.delete(this.baseUrl + 'DeleteProject?intProjectId=' + projectid);
  }
}

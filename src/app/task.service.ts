import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITask } from './Interface/ITask';
import { IParentTask } from './Interface/IParentTask';


@Injectable()
export class TaskService {

  baseUrl: string = 'http://localhost:52781/api/';

  constructor(private http: HttpClient) { }

  getAllTask(): Observable<ITask[]> {
    return this.http.get<ITask[]>(this.baseUrl + 'GetAllTask')
      .pipe();
  }

  getParentTasks(): Observable<IParentTask[]> {
    return this.http.get<IParentTask[]>(this.baseUrl + 'GetParentTask')
      .pipe();
  }

  endTask(taskid: number) {
    return this.http.post(this.baseUrl + 'EndTask?intTaskId=' + taskid, '');
  }

  AddTask(task: any) {
    return this.http.post(this.baseUrl + 'AddTask', task);
  }

  AddParentTask(task: IParentTask) {
    console.log('Parent Task');
    console.log(task);
    return this.http.post(this.baseUrl + 'AddParentTask', task);
  }

  getTaskById(taskid: number): Observable<ITask> {
    return this.http.get<ITask>(this.baseUrl + 'GetTaskById?intTasktId=' + taskid)
      .pipe();
  }

  EditTask(task: any) {
    return this.http.put(this.baseUrl + 'EditTask', task);
  }

}

import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { ProjectsService } from '../projects.service';
import { ITask } from '../Interface/ITask';
import { IProject } from '../Interface/IProject';

@Component({
  selector: 'app-viewtask',
  templateUrl: './viewtask.component.html',
  styleUrls: ['./viewtask.component.css']
})
export class ViewtaskComponent implements OnInit {

  allTask: ITask[];
  allProjects: IProject[];
  taskCount: number = 0;
  projectCount: number = 0;
  public searchText: string;
  projectId: number;
  display = 'none';

  constructor(private _taskService: TaskService,
    private _projectService: ProjectsService) { }

  ngOnInit() {
    this.GetAllTask();
    this.GetProjects();
  }

  private GetAllTask() {
    this._taskService.getAllTask().subscribe(
      result => {
        this.allTask = result;
        this.taskCount = result.length;
      });
  }

  private GetProjects() {
    this._projectService.getAllProjects().subscribe(
      result => {
        this.allProjects = result;
        this.projectCount = result.length;
      });
  }

  OpenProjectModal() {
    this.display = 'block';
  }

  closeProjectModal() {
    this.display = 'none';
  }

  SelectProject(projectId, projectName) {
    this.projectId = projectId;
    this.searchText = projectName;
    this.display = 'none';
  }


  SortByProject(strType: string) {

    switch (strType) {
      case "startdate":
        this.allTask.sort((a, b) => {
          return this.getTime(a.StartDate) - this.getTime(b.StartDate);
        });
        break;
      case "enddate":
        this.allTask.sort((a, b) => {
          return this.getTime(a.EndDate) - this.getTime(b.EndDate);
        });
        break;
      case "priority":
        this.allTask.sort(function (a, b) { return a.Priority - b.Priority });
        break;
      case "completed":
        this.allTask.sort((a, b) => a.Status.localeCompare(b.Status));
        break;
    }
  }

  EndTask(taskid) {
    this._taskService.endTask(taskid).subscribe(
      result => {
        this.GetAllTask();
      });
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }
}

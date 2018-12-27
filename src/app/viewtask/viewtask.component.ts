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
  searchText: string;
  projectId: number;
  display = 'none';
  isStartDateAsc = true;
  isEndDateAsc = true;
  isPriorityAsc = true;
  isCompletedAsc = true;

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
        if (this.isStartDateAsc) {
          this.allTask.sort((a, b) => {
            return this.getTime(a.StartDate) - this.getTime(b.StartDate);
          });
          this.isStartDateAsc = false;
        }
        else {
          this.allTask.sort((a, b) => {
            return this.getTime(a.StartDate) - this.getTime(b.StartDate);
          }).reverse();
          this.isStartDateAsc = true;
        }

        break;
      case "enddate":
        if (this.isEndDateAsc) {
          this.allTask.sort((a, b) => {
            return this.getTime(a.EndDate) - this.getTime(b.EndDate);
          });
          this.isEndDateAsc = false;
        }
        else {
          this.allTask.sort((a, b) => {
            return this.getTime(a.EndDate) - this.getTime(b.EndDate);
          }).reverse();
          this.isEndDateAsc = true;
        }

        break;
      case "priority":
        if (this.isPriorityAsc) {
          this.allTask.sort(function (a, b) { return a.Priority - b.Priority });
          this.isPriorityAsc = false;
        }
        else {
          this.allTask.sort(function (a, b) { return a.Priority - b.Priority }).reverse();
          this.isPriorityAsc = true;
        }

        break;
      case "completed":
        if (this.isCompletedAsc) {
          this.allTask.sort((a, b) => a.Status.localeCompare(b.Status));
          this.isCompletedAsc = false;
        }
        else {
          this.allTask.sort((a, b) => a.Status.localeCompare(b.Status)).reverse();
          this.isCompletedAsc = true;
        }
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

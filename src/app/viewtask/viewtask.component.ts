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

  allTask: ITask[] = [];
  allProjects: IProject[] = [];
  searchText: string;
  projectId: number;
  isStartDateAsc = true;
  isEndDateAsc = true;
  isPriorityAsc = true;
  isCompletedAsc = true;
  isloaded = false;
  searchUserText:string;
  
  constructor(private _taskService: TaskService,
    private _projectService: ProjectsService) { 

    }

  ngOnInit() {
    this.GetAllTask();
    this.GetProjects();
  }

  private GetAllTask() {
    this._taskService.getAllTask().subscribe(
      result => {
        this.allTask = result;
        console.log(result);
      });
  }

  private GetProjects() {
    this._projectService.getAllProjects().subscribe(
      result => {
        this.allProjects = result;
        this.isloaded = true;
      });
  }

  SelectProject(projectId, projectName) {
    this.projectId = projectId;
    this.searchText = projectName;
  }

  SortByProject(strType: string) {

    switch (strType) {
      case "startdate":
        if (this.isStartDateAsc) {
          this.allTask.sort((a, b) => {
            return this.getTime(a.StartDate) - this.getTime(b.StartDate);
          });
        }
        else {
          this.allTask.sort((a, b) => {
            return this.getTime(a.StartDate) - this.getTime(b.StartDate);
          }).reverse();
        }
        this.isStartDateAsc = !this.isStartDateAsc;
        break;
      case "enddate":
        if (this.isEndDateAsc) {
          this.allTask.sort((a, b) => {
            return this.getTime(a.EndDate) - this.getTime(b.EndDate);
          });
        }
        else {
          this.allTask.sort((a, b) => {
            return this.getTime(a.EndDate) - this.getTime(b.EndDate);
          }).reverse();
        }
        this.isEndDateAsc = !this.isEndDateAsc;
        break;
      case "priority":
        if (this.isPriorityAsc) {
          this.allTask.sort(function (a, b) { return a.Priority - b.Priority });
        }
        else {
          this.allTask.sort(function (a, b) { return a.Priority - b.Priority }).reverse();
        }
        this.isPriorityAsc = !this.isPriorityAsc;
        break;
      case "completed":
        if (this.isCompletedAsc) {
          this.allTask.sort((a, b) => a.Status.localeCompare(b.Status));
        }
        else {
          this.allTask.sort((a, b) => a.Status.localeCompare(b.Status)).reverse();
        }
        this.isCompletedAsc = !this.isCompletedAsc;
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

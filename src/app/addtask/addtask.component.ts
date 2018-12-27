import { Component, OnInit } from '@angular/core';
import { TaskService } from '../task.service';
import { UsersService } from '../users.service';
import { ProjectsService } from '../projects.service';
import { IProject } from '../Interface/IProject';
import { IUser } from '../Interface/IUsers';
import { IParentTask } from '../Interface/IParentTask';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-addtask',
  templateUrl: './addtask.component.html',
  styleUrls: ['./addtask.component.css']
})
export class AddtaskComponent implements OnInit {

  taskForm: FormGroup;
  allProjects: IProject[] = [];
  allUsers: IUser[] = [];
  parentTask: IParentTask[] = [];
  searchText: string;
  searchUserText: string;
  priority: number;
  isLesserEndDate: boolean = false;
  isParentTaskEnable: boolean = false;
  submitted = false;
  taskid: number = 0;
  isEditMode: boolean = false;
  buttonCaption: string = "Add Task";
  cancelButtonCaption: string = "Reset";
  p: number = 1;

  constructor(private formBuilder: FormBuilder,
    private _projectService: ProjectsService,
    private _usersService: UsersService,
    private _taskService: TaskService,
    private router: Router, route: ActivatedRoute,
  ) {
    this.taskid = route.snapshot.params['taskid'];

  }

  ngOnInit() {

    this.taskForm = this.formBuilder.group({
      ProjectId: [null],
      Project: [null, Validators.required],
      TaskId: [null],
      TaskName: ['', Validators.required],
      isParentTask: [true],
      Priority: [null],
      UserId: [null],
      UserName: [{ value: null, disabled: true }],
      StartDate: [null],
      EndDate: [null],
      ParentTaskId: [null],
      ParentTask: [{ value: null, disabled: true }]
    });

    if (this.taskid > 0) {
      this.isEditMode = true;
      this.isParentTaskEnable = true;
      this.buttonCaption = "Update";
      this.cancelButtonCaption = "Cancel";
      this.GetTaskById();
    }
    else {
      this.EnableDisableControls(true);
    }

    this.GetProjects();
    this.GetParentTask();
    this.GetAllUsers();
  }

  GetTaskById() {
    this._taskService.getTaskById(this.taskid).subscribe(
      result => {
        this.priority = result.Priority;
        this.taskForm.setValue({
          ProjectId: result.ProjectId,
          Project: result.Project,
          TaskId: result.TaskId,
          TaskName: result.TaskName,
          isParentTask: false,
          Priority: result.Priority,
          UserId: result.UserId,
          UserName: result.UserName,
          StartDate: result.StartDate,
          EndDate: result.EndDate,
          ParentTaskId: result.ParentTaskId,
          ParentTask: result.ParentTask,
        })
      });
  }

  private GetProjects() {
    this._projectService.getAllProjects().subscribe(
      result => {
        this.allProjects = result;
      });
  }

  private GetParentTask() {
    this._taskService.getParentTasks().subscribe(
      result => {
        this.parentTask = result;
      });
  }

  private GetAllUsers() {
    this._usersService.getAllUsers().subscribe(
      result => {
        this.allUsers = result;
      });
  }

  SelectProject(projectId, projectName) {
    this.taskForm.controls['ProjectId'].setValue(projectId);
    this.taskForm.controls['Project'].setValue(projectName);
  }

  SelectParentTask(parentTaskId, parentTaskName) {
    this.taskForm.controls['ParentTask'].setValue(parentTaskName);
    this.taskForm.controls['ParentTaskId'].setValue(parentTaskId);
  }

  SelectUser(userid, username, lastname) {
    this.taskForm.controls['UserId'].setValue(userid);
    this.taskForm.controls['UserName'].setValue(username + " " + lastname);
  }

  onParentTaskChange(event) {
    this.EnableDisableControls(event.target.checked);
  }

  EnableDisableControls(isEnable: boolean) {
    if (!isEnable) {
      var endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      this.taskForm.controls['StartDate'].enable();
      this.taskForm.controls['EndDate'].enable();
      this.taskForm.controls['Priority'].enable();
      this.taskForm.controls['StartDate'].setValue(new Date());
      this.taskForm.controls['EndDate'].setValue(endDate);
      this.isParentTaskEnable = false;
    }
    else {
      this.taskForm.controls['StartDate'].setValue(null);
      this.taskForm.controls['EndDate'].setValue(null);
      this.taskForm.controls['Priority'].setValue(0);
      this.taskForm.controls['StartDate'].disable();
      this.taskForm.controls['EndDate'].disable();
      this.taskForm.controls['Priority'].disable();
      this.priority = null;
      this.isParentTaskEnable = true;
    }
  }

  compareTwoDates() {
    if (new Date(this.taskForm.controls['EndDate'].value) < new Date(this.taskForm.controls['StartDate'].value)) {
      this.isLesserEndDate = true;
    }
    else
      this.isLesserEndDate = false;
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

  onSubmit() {

    this.submitted = true;

    if (this.taskForm.invalid) {
      return;
    }

    this.compareTwoDates();
    if (this.isLesserEndDate) {
      return;
    }

    if (this.taskForm.controls['TaskId'].value == null || this.taskForm.controls['TaskId'].value == '') {
      if (this.taskForm.controls['isParentTask'].value) {
        this.taskForm.controls['ParentTask'].enable();
        this.taskForm.controls['ParentTask'].setValue(this.taskForm.controls['TaskName'].value);
        this._taskService.AddParentTask(this.taskForm.value).subscribe(
          restult => {
            this.Reset();
            this.GetParentTask();
            this.taskForm.controls['ParentTask'].disable();
          }
        );
      }
      else {
        if (this.taskForm.controls['Priority'].value == 0)
          this.taskForm.controls['Priority'].setValue(null);
        this._taskService.AddTask(this.taskForm.value).subscribe(
          restult => {
            this.Reset();
          }
        );
      }

    }
    else {
      this._taskService.EditTask(this.taskForm.value).subscribe();
      this.router.navigate(['/viewtask']);
    }
  }

  Reset() {
    this.taskForm.reset();
    this.submitted = false;
    this.priority = null;
    this.EnableDisableControls(true);
    this.taskForm.controls['isParentTask'].setValue(true);
  }

  get f() {
    return this.taskForm.controls;
  }

}

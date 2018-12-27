import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectsService } from '../projects.service';
import { UsersService } from '../users.service';
import { IProject } from '../Interface/IProject';
import { IUser } from '../Interface/IUsers';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projectForm: FormGroup;
  allProjects: IProject[];
  allUsers: IUser[];
  searchText: string;
  searchUserText: string;
  display = 'none';
  buttonCaption: string = "Add";
  managerName: string;
  isLesserEndDate: boolean = false;
  checkDisabled: boolean = true;
  submitted = false;
  projectCount: number;
  userCount: number;
  priority: number;
  p: number = 1;

  isStartDateAsc = true;
  isEndDateAsc = true;
  isPriorityAsc = true;
  isCompletedAsc = true;

  constructor(private formBuilder: FormBuilder,
    private _projectService: ProjectsService,
    private _usersService: UsersService
  ) { }

  ngOnInit() {
    this.projectForm = this.formBuilder.group({
      ProjectName: ['', Validators.required],
      StartDate: [null],
      EndDate: [null],
      Priority: [0],
      ProjectId: [null],
      UserId: [null],
      StartDateEndDateChecked: [false]
    });

    this.projectForm.controls['StartDate'].disable();
    this.projectForm.controls['EndDate'].disable();
    this.GetAllProjects();
    this.GetAllUsers();
  }

  compareTwoDates() {
    if (new Date(this.projectForm.controls['EndDate'].value) < new Date(this.projectForm.controls['StartDate'].value)) {
      this.isLesserEndDate = true;
    }
    else
      this.isLesserEndDate = false;
  }


  private GetAllUsers() {
    this._usersService.getAllUsers().subscribe(
      result => {
        this.allUsers = result;
        this.userCount = result.length;
      });
  }

  onSubmit() {

    this.submitted = true;

    if (this.projectForm.invalid) {
      return;
    }

    this.compareTwoDates();
    if (this.isLesserEndDate) {
      return;
    }

    if (this.projectForm.controls['ProjectId'].value == null || this.projectForm.controls['ProjectId'].value == '') {
      if (this.projectForm.controls['Priority'].value == 0)
        this.projectForm.controls['Priority'].setValue(null);
      this._projectService.addProject(this.projectForm.value).subscribe(result => {
        this.GetAllProjects();
      });
    }
    else {
      if (this.projectForm.controls['Priority'].value == 0)
        this.projectForm.controls['Priority'].setValue(null);
      this._projectService.EditProject(this.projectForm.value).subscribe(
        result => {
          this.GetAllProjects();
        });
    }
    this.Reset();

  }

  Reset() {
    this.projectForm.reset();
    this.submitted = false;
    this.buttonCaption = "Add";
    this.priority = null;
    this.managerName = '';
    this.projectForm.controls['StartDate'].disable();
    this.projectForm.controls['EndDate'].disable();
    this.projectForm.controls['Priority'].setValue(0);
  }

  private GetAllProjects() {
    this._projectService.getAllProjects().subscribe(
      result => {
        this.allProjects = result;
        this.projectCount = result.length;
      });
  }

  SortByProject(strType: string) {
    switch (strType) {
      case "startdate":
        if (this.isStartDateAsc) {
          this.allProjects.sort((a, b) => {
            return this.getTime(a.StartDate) - this.getTime(b.StartDate);
          });
          this.isStartDateAsc = false;
        }
        else {
          this.allProjects.sort((a, b) => {
            return this.getTime(a.StartDate) - this.getTime(b.StartDate);
          }).reverse();
          this.isStartDateAsc = true;
        }

        break;
      case "enddate":
        if (this.isEndDateAsc) {
          this.allProjects.sort((a, b) => {
            return this.getTime(a.EndDate) - this.getTime(b.EndDate);
          });
          this.isEndDateAsc = false;
        }
        else {
          this.allProjects.sort((a, b) => {
            return this.getTime(a.EndDate) - this.getTime(b.EndDate);
          }).reverse();
          this.isEndDateAsc = true;
        }

        break;
      case "priority":
        if (this.isPriorityAsc) {
          this.allProjects.sort(function (a, b) { return a.Priority - b.Priority });
          this.isPriorityAsc = false;
        }
        else {
          this.allProjects.sort(function (a, b) { return a.Priority - b.Priority }).reverse();
          this.isPriorityAsc = true;
        }

        break;
      case "completed":
        if (this.isCompletedAsc) {
          this.allProjects.sort(function (a, b) { return a.CompletedTask - b.CompletedTask });
          this.isCompletedAsc = false;
        }
        else {
          this.allProjects.sort(function (a, b) { return a.CompletedTask - b.CompletedTask }).reverse();
          this.isCompletedAsc = true;
        }

        break;
    }
  }

  private getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  ProjectEdit(project) {

    this.buttonCaption = "Update";
    var isEditChecked: Boolean = false;

    if (project.StartDate != null || project.EndDate != null) {
      isEditChecked = true;
      this.projectForm.controls['StartDate'].enable();
      this.projectForm.controls['EndDate'].enable();
    }
    else {
      this.projectForm.controls['StartDate'].disable();
      this.projectForm.controls['EndDate'].disable();
    }
    this.priority = project.Priority;
    this.managerName = project.UserName;

    this.projectForm.setValue({
      ProjectName: project.ProjectName,
      StartDate: project.StartDate,
      EndDate: project.EndDate,
      Priority: project.Priority,
      ProjectId: project.ProjectId,
      UserId: project.UserId,
      StartDateEndDateChecked: isEditChecked
    })
    window.scroll(0, 0);
  }

  DeleteProject(projectid) {
    this._projectService.deleteProject(projectid).subscribe(
      result => {
        this.GetAllProjects();
      });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  get f() {
    return this.projectForm.controls;
  }


  onCheckChange(event) {
    if (event.target.checked) {
      var endDate = new Date();
      endDate.setDate(endDate.getDate() + 1);
      this.projectForm.controls['StartDate'].enable();
      this.projectForm.controls['EndDate'].enable();
      this.projectForm.controls['StartDate'].setValue(new Date());
      this.projectForm.controls['EndDate'].setValue(endDate);
    }
    else {
      this.projectForm.controls['StartDate'].setValue(null);
      this.projectForm.controls['EndDate'].setValue(null);
      this.projectForm.controls['StartDate'].disable();
      this.projectForm.controls['EndDate'].disable();
    }

  }

  openModalDialog() {
    this.searchUserText = '';
    this.display = 'block';
  }

  closeModalDialog() {
    this.display = 'none';
  }

  SelectUser(userid, username, lastname) {
    this.managerName = username + " " + lastname;
    this.projectForm.controls['UserId'].setValue(userid);
    this.display = 'none';
  }

  onPriorityChange(e) {
    this.priority = e.target.value;
  }

}

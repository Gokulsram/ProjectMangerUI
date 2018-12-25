import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UsersService } from '../users.service';
import { IUser } from '../Interface/IUsers';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  registerForm: FormGroup;
  submitted = false;
  allUsers: IUser[];
  buttonCaption: string = "Add";
  public searchText: string;
  userCount: number = 0;

  constructor(private formBuilder: FormBuilder, private _usersService: UsersService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      FirstName: ['', Validators.required],
      LastName: ['', [Validators.required]],
      EmployeeId: ['', [Validators.required]],
      UserId: [null],
      ProjectId: [null],
      TaskId: [null]
    });
    this.GetAllUsers();
  }

  onSubmit() {

    this.submitted = true;

    if (this.registerForm.invalid) {
      return;
    }

    if (this.registerForm.controls['UserId'].value == null || this.registerForm.controls['UserId'].value == '')
      this._usersService.addUser(this.registerForm.value).subscribe(result => {
        this.GetAllUsers();
      });
    else
      this._usersService.EditUser(this.registerForm.value).subscribe(
        result => {
          this.GetAllUsers();
        });

    this.buttonCaption = "Add";
    this.submitted = false;
    this.registerForm.reset();

  }

  Reset() {
    this.registerForm.reset();
    this.submitted = false;
    this.buttonCaption = "Add";
  }

  private GetAllUsers() {
    this._usersService.getAllUsers().subscribe(
      result => {
        this.allUsers = result;
        this.userCount = result.length;
      });
  }

  SortByUser(strType: string) {

    switch (strType) {
      case "firstname":
        this.allUsers.sort((a, b) => a.FirstName.localeCompare(b.FirstName));
        break;
      case "lastname":
        this.allUsers.sort((a, b) => a.LastName.localeCompare(b.LastName));
        break;
      case "employeeid":
        this.allUsers.sort(function (a, b) { return a.EmployeeId - b.EmployeeId });
        break;
    }

  }

  editUser(user) {
    this.buttonCaption = "Update";
    this.registerForm.setValue({
      FirstName: user.FirstName,
      LastName: user.LastName,
      EmployeeId: user.EmployeeId,
      ProjectId: user.ProjectId,
      TaskId: user.TaskId,
      UserId: user.UserId
    })
    window.scroll(0, 0);
  }

  deleteUser(userid) {
    this._usersService.deleteUser(userid).subscribe(
      result => {
        this.GetAllUsers();
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
    return this.registerForm.controls;
  }

}

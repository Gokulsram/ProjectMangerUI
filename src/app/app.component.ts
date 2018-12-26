import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private router: Router) {
    this.DefaultStyle();
    this.adduserstyle = "view-task btn cust-add-user cust-task mr-3 cust-add-user-active";
  }

  adduserstyle: string;
  addtaskstyle: string;
  addprjectstyle: string;
  viewtaskstyle: string;

  AddUser() {
    this.DefaultStyle();
    this.adduserstyle = "view-task btn cust-add-user cust-task mr-3 cust-add-user-active";
    this.router.navigate(['/']);
  }

  AddProject() {
    this.DefaultStyle();
    this.addprjectstyle = "view-task btn cust-add-project cust-task mr-3 cust-add-project-active";
    this.router.navigate(['/addproject']);
  }

  AddTask() {
    this.DefaultStyle();
    this.addtaskstyle = "add-task btn mr-2 cust-add-task cust-task mr-3 cust-add-task-active";
    this.router.navigate(['/addtask']);
  }

  ViewTask() {
    this.DefaultStyle();
    this.viewtaskstyle = "view-task btn cust-view-task cust-task cust-view-task-active";
    this.router.navigate(['/viewtask']);
  }

  DefaultStyle() {
    this.adduserstyle = "view-task btn cust-add-user cust-task mr-3";
    this.addtaskstyle = "add-task btn mr-2 cust-add-task cust-task mr-3";
    this.addprjectstyle = "view-task btn cust-add-project cust-task mr-3";
    this.viewtaskstyle = "view-task btn cust-view-task cust-task";
  }

}

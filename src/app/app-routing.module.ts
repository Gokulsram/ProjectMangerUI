import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddtaskComponent } from './addtask/addtask.component';
import { UsersComponent } from './users/users.component';
import { ProjectsComponent } from './projects/projects.component';
import { ViewtaskComponent } from './viewtask/viewtask.component';

const routes: Routes = [

  { path: 'addproject', component: ProjectsComponent },
  { path: 'viewtask', component: ViewtaskComponent },
  { path: 'addtask', component: AddtaskComponent },
  { path: 'addtask/:taskid', component: AddtaskComponent },
  { path: '', component: UsersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

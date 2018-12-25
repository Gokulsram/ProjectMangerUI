import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddtaskComponent } from './addtask/addtask.component';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskService } from './task.service';
import { UsersService } from './users.service';
import { ProjectsService } from './projects.service';
import { UsersComponent } from './users/users.component';
import { GrdFilterPipe } from './Filter/grd-filter.pipe';
import { ProjectsComponent } from './projects/projects.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ViewtaskComponent } from './viewtask/viewtask.component';

@NgModule({
  declarations: [
    AppComponent,
    AddtaskComponent,
    UsersComponent,
    GrdFilterPipe,
    ProjectsComponent,
    ViewtaskComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgxPaginationModule,
    BsDatepickerModule.forRoot(),
    DatepickerModule.forRoot()
  ],
  providers: [TaskService, UsersService, ProjectsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

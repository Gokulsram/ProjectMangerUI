import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AddtaskComponent } from './addtask.component';
import { TaskService } from '../task.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { GrdFilterPipe } from '../Filter/grd-filter.pipe';
import { UsersService } from '../users.service';
import { ProjectsService } from '../projects.service';
import { RouterTestingModule } from '@angular/router/testing';
import { NgxPaginationModule } from 'ngx-pagination';

describe('AddtaskComponent', () => {
  let component: AddtaskComponent;
  let fixture: ComponentFixture<AddtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(), HttpClientModule, RouterTestingModule, NgxPaginationModule],
      declarations: [AddtaskComponent, GrdFilterPipe],
      providers: [TaskService, UsersService, ProjectsService]
    })
      .compileComponents();
  }));


  beforeEach(() => {
    fixture = TestBed.createComponent(AddtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

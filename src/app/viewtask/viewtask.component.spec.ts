import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskService } from '../task.service';
import { ViewtaskComponent } from './viewtask.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GrdFilterPipe } from '../Filter/grd-filter.pipe';
import { ProjectsService } from '../projects.service';
import { RouterTestingModule } from '@angular/router/testing';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';

describe('ViewtaskComponent', () => {
  let component: ViewtaskComponent;
  let fixture: ComponentFixture<ViewtaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(), HttpClientModule, RouterTestingModule],
      declarations: [ViewtaskComponent, GrdFilterPipe],
      providers: [TaskService, ProjectsService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewtaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

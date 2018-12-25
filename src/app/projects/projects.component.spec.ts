import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectsComponent } from './projects.component';
import { HttpClientModule } from '@angular/common/http';
import { DatepickerModule, BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ProjectsService } from '../projects.service';
import { UsersService } from '../users.service';
import { GrdFilterPipe } from '../Filter/grd-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

describe('ProjectsComponent', () => {
  let component: ProjectsComponent;
  let fixture: ComponentFixture<ProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule, BsDatepickerModule.forRoot(),
        DatepickerModule.forRoot(), HttpClientModule, NgxPaginationModule],
      declarations: [ProjectsComponent, GrdFilterPipe],
      providers: [ProjectsService, UsersService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ProfileModel } from '../../data/model/profile.model';
import { ProjectResumeModel } from '../../data/model/project_resume.model';
import { LandingService } from '../../data/remote/landing.service';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;
  let projectResumes: ProjectResumeModel[];
  let profile: ProfileModel;

  beforeEach(async () => {
    let mockLandingService = jasmine.createSpyObj('LandingService', ['getProjectsResume', 'getProfile']);
    projectResumes = [];
    profile = {
      name: 'John Doe',
      email: 'john@doe.com',
      avatar: 'https://picsum.photos/seed/johndoe/64/64',
      social: [],
    };

    mockLandingService.getProjectsResume.and.returnValue(of(projectResumes));
    mockLandingService.getProfile.and.returnValue(of(profile));

    await TestBed.configureTestingModule({
      declarations: [ LandingPageComponent ],
      providers: [
        {
          provide: LandingService,
          useValue: mockLandingService
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the email', () => {
    const rawHtml = fixture.nativeElement as HTMLElement;
    const element = rawHtml.querySelector('.profile-email')
    expect(element).toBeTruthy();
    expect(element!.textContent).toBe(profile.email);
  });
});

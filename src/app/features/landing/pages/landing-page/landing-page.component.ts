import { Component, OnInit } from '@angular/core';
import { Observable, of, shareReplay } from 'rxjs';
import { ProfileModel } from '../../data/model/profile.model';
import { MediaType, ProjectResumeModel, ProjectType } from '../../data/model/project_resume.model';
import { LandingService } from '../../data/remote/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent {

  // observables
  public projects$: Observable<ProjectResumeModel[]> = this.landingService.getProjectsResume();
  public profile$: Observable<ProfileModel> = this.landingService.getProfile().pipe(shareReplay());
  public date$: Observable<Date> = of(new Date());

  // public enumerators
  public mediaTypes = MediaType;
  public projectTypes = ProjectType;

  constructor(private readonly landingService: LandingService) { }
}

import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileModel } from '../../data/model/profile.model';
import { MediaType, ProjectResumeModel, ProjectType } from '../../data/model/project_resume.model';
import { LandingService } from '../../data/remote/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  // observables
  public projects$!: Observable<ProjectResumeModel[]>;
  public profile$!: Observable<ProfileModel>;

  // public enumerators
  public mediaTypes = MediaType;
  public projectTypes = ProjectType;

  constructor(private readonly landingService: LandingService) { }

  ngOnInit(): void {
    this.projects$ = this.landingService.getProjectsResume();
    this.profile$ = this.landingService.getProfile();
  }

  public get currentDate(): Date {
    return new Date();
  }
}

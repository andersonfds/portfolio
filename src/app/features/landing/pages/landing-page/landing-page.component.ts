import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MediaType, ProjectResumeModel, ProjectType } from '../../data/model/project_resume.model';
import { LandingService } from '../../data/remote/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public projects$!: Observable<ProjectResumeModel[]>;

  public mediaTypes = MediaType;
  public projectTypes = ProjectType;

  constructor(private readonly landingService: LandingService) { }

  ngOnInit(): void {
    this.projects$ = this.landingService.getProjectsResume();
  }

  
  public get year() : string {
    return new Date().getFullYear().toString();
  }
  

}

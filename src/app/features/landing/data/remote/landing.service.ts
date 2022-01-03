import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MediaType, ProjectResumeModel, ProjectType } from '../model/project_resume.model';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private readonly http: HttpClient) { }

  getProjectsResume(): Observable<ProjectResumeModel[]> {
    return of([
      {
        id: '1',
        technology: 'Flutter',
        appName: 'Burnout',
        description: 'App to measure burnout level on health care professionals',
        media: '/assets/projects/burnout/1.mp4',
        mediaType: MediaType.video,
        projectType: ProjectType.mobile,
        link: 'https://github.com/andersonfds/burnout-app',
      },
      {
        id: '2',
        technology: 'Flutter',
        appName: 'flutter_widget_indicator',
        description: 'A builder widget that will allow you to create custom indicators for your flutter pageViews',
        media: 'https://github.com/andersonfds/pageview_widget_indicator/raw/main/assets/pageview_dots_example.gif?raw=true',
        mediaType: MediaType.image,
        projectType: ProjectType.package,
        link: 'https://github.com/andersonfds/pageview_widget_indicator',
      },
    ]);
  }
}

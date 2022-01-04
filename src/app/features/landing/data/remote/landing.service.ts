import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { plainToInstance } from 'class-transformer';
import { map, Observable } from 'rxjs';
import { ProfileModel } from '../model/profile.model';
import { ProjectResumeModel } from '../model/project_resume.model';
import { ProjectResumeResponseModel } from '../model/response/project_resume_response.model';

@Injectable({
  providedIn: 'root'
})
export class LandingService {

  constructor(private readonly http: HttpClient) { }

  getProjectsResume(): Observable<ProjectResumeModel[]> {
    return this.http.get<Object[]>('projects').pipe(
      map((value) => plainToInstance(ProjectResumeResponseModel, value)),
    );
  }

  getProfile(): Observable<ProfileModel> {
    return this.http.get<ProfileModel>('profile');
  }
}

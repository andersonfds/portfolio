import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, Inject, OnDestroy } from '@angular/core';
import { BehaviorSubject, first, firstValueFrom, interval, map, Observable, of, shareReplay, Subscription, switchMap, tap } from 'rxjs';
import { ProfileModel } from '../../data/model/profile.model';
import { MediaType, ProjectResumeModel, ProjectType } from '../../data/model/project_resume.model';
import { LandingService } from '../../data/remote/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {

  private projectSelector = new BehaviorSubject<ProjectResumeModel | null>(null);
  private subscriptions = new Array<Subscription>();

  // observables
  public projects$: Observable<ProjectResumeModel[]> = this.landingService.getProjectsResume();
  public profile$: Observable<ProfileModel> = this.landingService.getProfile().pipe(shareReplay());
  public date$: Observable<Date> = of(new Date());
  public projectMargin$!: Observable<number>;

  // public enumerators
  public mediaTypes = MediaType;
  public projectTypes = ProjectType;

  constructor(private readonly landingService: LandingService, @Inject(DOCUMENT) private document: Document) { }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe()); 
  }

  ngAfterViewInit(): void {
    /// automatic carousel enabled
    this.subscriptions.push(interval(5000).subscribe(() => this.nextProject()));

    /// when project changes, update the margin to the next project
    this.projectMargin$ = this.projectSelector.pipe(
      map(project => -1 * (this.document.getElementById('proj--' + project?.id)?.offsetLeft || 0)),
    );
  }

  async nextProject() {
    const nextProject = await this.getNextProject();

    if (nextProject)
      this.projectSelector.next(nextProject);
  }

  private getNextProject(): Promise<ProjectResumeModel | undefined> {
    return firstValueFrom(this.projects$
      .pipe(
        first(),
        map(projects => {
          const currentProjectIndex = projects.findIndex(project => project.id === this.projectSelector.value?.id);

          if (currentProjectIndex === -1) {
            return projects[0];
          }

          return projects[currentProjectIndex + 1] || projects[0];
        }),
      ));
  }
}

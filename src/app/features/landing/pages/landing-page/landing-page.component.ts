import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, first, firstValueFrom, interval, map, Observable, of, shareReplay, Subscription, tap } from 'rxjs';
import { ProfileModel } from '../../data/model/profile.model';
import { MediaType, ProjectResumeModel, ProjectType } from '../../data/model/project_resume.model';
import { LandingService } from '../../data/remote/landing.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
})
export class LandingPageComponent implements AfterViewInit, OnDestroy {

  @ViewChild('projectsScrollContainer', { static: true, read: ElementRef }) scrollContainer!: ElementRef<HTMLDivElement>;

  private projectSelector = new BehaviorSubject<ProjectResumeModel | null>(null);
  private subscriptions = new Array<Subscription>();

  // observables
  public projects$: Observable<ProjectResumeModel[]> = this.landingService.getProjectsResume().pipe(shareReplay(1));
  public profile$: Observable<ProfileModel> = this.landingService.getProfile().pipe(shareReplay());
  public readme$: Observable<string> = this.profile$.pipe(map(profile => profile.readme_markdown));
  public date$: Observable<Date> = of(new Date());

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
  }

  async nextProject() {
    /// picking the next project
    const nextProject = await this.getNextProject();

    /// setting the next project as the current project
    if (nextProject)
      this.projectSelector.next(nextProject);
  }

  private getScrollOffset(project: ProjectResumeModel): number {
    return (this.document.getElementById('proj--' + project?.id)?.offsetLeft || 0);
  }

  private getNextProject(): Promise<ProjectResumeModel | undefined> {
    return firstValueFrom(this.projects$
      .pipe(
        first(),
        /// picking the project
        map(projects => {
          const currentProjectIndex = projects.findIndex(project => project.id === this.projectSelector.value?.id);

          if (currentProjectIndex === -1) {
            return projects[0];
          }

          return projects[currentProjectIndex + 1] || projects[0];
        }),
        /// scrolling to the next project
        tap((value) => this.scrollContainer.nativeElement.scrollLeft = this.getScrollOffset(value)),
      ));
  }
}

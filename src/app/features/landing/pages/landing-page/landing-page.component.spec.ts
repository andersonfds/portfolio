import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LandingService } from '../../data/remote/landing.service';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    let mockLandingService = jasmine.createSpyObj('LandingService', ['getProjectsResume', 'getProfile']);

    mockLandingService.getProjectsResume.and.returnValue(of([]));
    mockLandingService.getProfile.and.returnValue(of({}));

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
});

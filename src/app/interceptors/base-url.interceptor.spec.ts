import { HttpClient, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LandingService } from '../features/landing/data/remote/landing.service';
import { BaseUrlInterceptor } from './base-url.interceptor';


describe('BaseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let service: LandingService;

  const next: HttpHandler = {
    handle: (req: HttpRequest<any>): Observable<any> => of(true)
  };

  beforeEach(function () {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true },
        { provide: LandingService, useClass: LandingService },
      ]
    });
    httpMock = TestBed.inject(HttpTestingController);
    service = TestBed.inject(LandingService);
  });

  it('should be created', () => {
    const interceptor: HttpInterceptor[] = TestBed.inject(HTTP_INTERCEPTORS);
    expect(interceptor).toBeTruthy();
    expect(interceptor.length).toBeGreaterThan(0);
  });

  it('should use the environment as base url when the request doesnt start with http', () => {
    service.getProfile().subscribe((res) => {
      expect(res).toBeTruthy();
    });
    httpMock.expectOne(`${environment.apiUrl}profile`);
  });

  it('should throw an error if the request starts with a "/"', () => {
    const client = TestBed.inject(HttpClient);
    expect(client).toBeTruthy();

    client.get('/test_endpoint')
      .subscribe({
        next: () => { },
        error: (err) => {
          expect(err).toBeTruthy();
        },
      })
  })
});

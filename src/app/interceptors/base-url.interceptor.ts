import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (request.url.startsWith('/')) {
      throw new Error('Url must not start with "/" to follow our convention');
    }

    if (!request.url.startsWith('http')) {
      const url = environment.apiUrl + request.url;
      request = request.clone({ url });
    }

    return next.handle(request);
  }
}

import { HttpEvent, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environment';

@Injectable()
export class ExceptionInterceptor implements HttpInterceptor {

  constructor(private toastr: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(res => {
        if (res instanceof HttpResponse && res.status === 200) {
          this.toastr.success('Request succeded', `${request.method} ${request.url.replace(environment.API.base, '')}`)
        }
      }),
      catchError((error: HttpErrorResponse) => {
          this.toastr.error(error.message, `Error ${error.status}`);
          return throwError(() => error);
      })
    );
  }

}

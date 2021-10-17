import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  errorLogin = new Subject<boolean>();
  constructor(private httpClient: HttpClient) {
  }

  public get(path: string, options?: any): Observable<any> {
    return this.httpClient.get(path, options).pipe(catchError(this.formatErrors));
  }

  public put(path: string, body: object = {}, headers?: any): Observable<any> {
    let options = {
      headers: headers
    }
    return this.httpClient.put(path, JSON.stringify(body), options).pipe(catchError(this.formatErrors));
  }

  public post(path: string, body: object = {}, options?: any): Observable<any> {
    return this.httpClient.post(path, JSON.stringify(body), options).pipe(catchError(this.formatErrors));
  }

  public delete(path: string, headers?: any): Observable<any> {
    return this.httpClient.delete(path, { headers, responseType: 'text' }).pipe(catchError(this.formatErrors));
  }

  public appendHeaders(header: HttpHeaders) {
    if (header != undefined) {
      return header.set('Content-Type', 'application/json');
    }
    return new HttpHeaders().set('Content-Type', 'application/json');
  }

  public formatErrors(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401 && error.error.message == 'Authentication failed') {
      try {
        this.errorLogin.next(true);
      } catch (error) {
      }
    }
    return throwError(error);
  }

  showCredError() {
    this.errorLogin.next(true);
  }
  hideCredError() {
    this.errorLogin.next(false);
  }

}


import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

import { Observable } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjUsIkZpcnN0TmFtZSI6ImFuayIsIkxhc3ROYW1lIjoibXVwIiwiUGhvbmUiOiIxMjM0NTY3ODkwIiwiRW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJBZGRyZXNzIjoicmp5IiwiTWFwQWRkcmVzcyI6InRlc3QiLCJSb2xlSWQiOjAsIklzQWRtaW4iOiJZIiwiVXNlclR5cGUiOiJBIiwiU3RhdHVzIjoiWSIsIkNyZWF0ZWREYXRlIjoiMjAyMC0wOC0yNVQyMDoxNjoyNC41NTAiLCJDcmVhdGVkVXNlcklkIjowLCJVcGRhdGVkRGF0ZSI6IjIwMjAtMDgtMjVUMjA6MTY6MjQuNTUwIiwiVXBkYXRlZFVzZXJJZCI6MCwiVG9rZW4iOm51bGwsImlhdCI6MTYwMDE2Nzk4NiwiZXhwIjoxNjMxNzAzOTg2fQ.LPfPFsfCgW2f5bBrfEU6-RvVSGBJ7p5_4EOtxsf9aYw',

  })
};


@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  constructor(private http: HttpClient) { }

  fullUrl = `${environment.apiUrl}`; 
  sampleUrl = `${environment.apiUrl}`;

  postmethod(url: string, obj: object): Observable<any> {
    return this.http.post(`${this.fullUrl}${url}`, obj)
      .pipe(map(
        (res: Response) => {
          return res;
        }));
  }

  Putmethod(url: string, obj: object): Observable<any> {
    return this.http.put(`${this.fullUrl}${url}`, obj)
      .pipe(map(
        (res: Response) => {
          return res;
        }));
  }
  get(path: string): Observable<any> {
    return this.http.get(`${this.sampleUrl}${path}`, {})
      .pipe(map(
        (res: Response) => {
          if (res) {
            return res;
          } else {
            return '';
          }
        }));
  }

  invenData(data){
    return this.http.post(`${environment.apiMWUrl}cdkdmsdealerdata/GetNIInventoryData`, JSON.stringify(data),httpOptions);
  
  }

  deleteElement(obj,modname){
    return this.http.request('delete', `${this.fullUrl}`+modname, { body: obj });
  }

}

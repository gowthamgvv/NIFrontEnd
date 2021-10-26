import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { map, tap, switchMap } from 'rxjs/operators';

import { JwtHelperService } from '@auth0/angular-jwt';

import { LoginModel } from '../../_models/login';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

import {usersPwdModel } from '../../_models/user';
import { Router } from '@angular/router';





@Injectable({
  providedIn: 'root',
})
export class ApiService {
  decodedToken: any;
  jwtHelper = new JwtHelperService();



  constructor(private http: HttpClient,private router: Router) { }


  login(model: LoginModel) {
    return this.http.post(`${environment.apiUrl}dealerlogin/dealersignin`, model);
  }

  loggedIn() {
    const token = localStorage.getItem('NetImpFrtEND_Token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('NetImpFrtEND_Token');
  }

  logout(): any {
    return this.http.delete(`${environment.apiUrl}auth/logout`);
  }

  GetDealershipGroupsData(data) {
    return this.http.post(`${environment.apiUrl}dealershipgroups/get`, JSON.stringify(data));
  }
  showRolesData(data) {
    return this.http.post(`${environment.apiUrl}roles/get`, JSON.stringify(data));
  }

 updateDealerUserPwd(model: usersPwdModel): any {
    return this.http.post(`${environment.apiUrl}dealerlogin/change`, model);
  }

  postmethod(endpoint: string, obj: object): Observable<any> {

    // const addgroupToken = {
    //   headers: new HttpHeaders({ 
    //     'Content-Type': 'application/json',
    //     'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjUsIkZpcnN0TmFtZSI6ImFuayIsIkxhc3ROYW1lIjoibXVwIiwiUGhvbmUiOiIxMjM0NTY3ODkwIiwiRW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJBZGRyZXNzIjoicmp5IiwiTWFwQWRkcmVzcyI6InRlc3QiLCJSb2xlSWQiOjAsIklzQWRtaW4iOiJZIiwiVXNlclR5cGUiOiJBIiwiU3RhdHVzIjoiWSIsIkNyZWF0ZWREYXRlIjoiMjAyMC0wOC0yNVQyMDoxNjoyNC41NTAiLCJDcmVhdGVkVXNlcklkIjowLCJVcGRhdGVkRGF0ZSI6IjIwMjAtMDgtMjVUMjA6MTY6MjQuNTUwIiwiVXBkYXRlZFVzZXJJZCI6MCwiVG9rZW4iOm51bGwsImlhdCI6MTYwMDE2Nzg5NCwiZXhwIjoxNjMxNzAzODk0fQ.Pf1Lcr4YvwEUsq-KXW4_PHladSMdNENhEcjB3oSj0Tg'
    //   })
    // };

    return this.http.post(`${environment.apiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }

    postMWmethod(endpoint: string, obj: object): Observable<any> {
      return this.http.post(`${environment.apiMWUrl}${endpoint}`, obj)
      .pipe(map(
        (res: any) => {
        return res;
      }));
      }


  putmethod(endpoint: string, obj: object): Observable<any> {

    // const addgroupToken = {
    //   headers: new HttpHeaders({ 
    //     'Content-Type': 'application/json',
    //     'x-access-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOjUsIkZpcnN0TmFtZSI6ImFuayIsIkxhc3ROYW1lIjoibXVwIiwiUGhvbmUiOiIxMjM0NTY3ODkwIiwiRW1haWwiOiJ0ZXN0dXNlckBnbWFpbC5jb20iLCJBZGRyZXNzIjoicmp5IiwiTWFwQWRkcmVzcyI6InRlc3QiLCJSb2xlSWQiOjAsIklzQWRtaW4iOiJZIiwiVXNlclR5cGUiOiJBIiwiU3RhdHVzIjoiWSIsIkNyZWF0ZWREYXRlIjoiMjAyMC0wOC0yNVQyMDoxNjoyNC41NTAiLCJDcmVhdGVkVXNlcklkIjowLCJVcGRhdGVkRGF0ZSI6IjIwMjAtMDgtMjVUMjA6MTY6MjQuNTUwIiwiVXBkYXRlZFVzZXJJZCI6MCwiVG9rZW4iOm51bGwsImlhdCI6MTYwMDE2Nzg5NCwiZXhwIjoxNjMxNzAzODk0fQ.Pf1Lcr4YvwEUsq-KXW4_PHladSMdNENhEcjB3oSj0Tg'
    //   })
    // };

    return this.http.put(`${environment.apiUrl}${endpoint}`, obj)
    .pipe(map(
      (res: any) => {
      return res;
    }));
    }

    async reload(url: string): Promise<boolean> {
      await this.router.navigateByUrl('.', { skipLocationChange: true });
      return this.router.navigateByUrl(url);
    }

    deleteElement(id,modname){
      return this.http.request('delete', `${environment.apiUrl}`+modname, { body: id });
    }

}


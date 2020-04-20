import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {RequestOptions, Request, Headers } from '@angular/http';
const hostName = "https://tuned-application.herokuapp.com"
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  addNewUser(user){
    debugger
    return this.http.post(`${hostName}/api/${user.dtype}/new`, user,  this.httpOptions).pipe(
      tap( v => {
        debugger
        console.log(v)
      }),
      
    );
  }

  getUsers(userType){
    let url = `${hostName}/api/${userType}/all`;
    debugger
    return this.http.get(url);
  }
}

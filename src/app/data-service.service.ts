import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import {RequestOptions, Request, Headers } from '@angular/http';
const hostName = "https://tuned-application.herokuapp.com"
@Injectable({
  providedIn: 'root'
})
export class DataServiceService {

  httpOptions = {
    headers: new HttpHeaders({ 
      'Access-Control-Allow-Origin':'*',
      'Authorization':'authkey',
      'userid':'1'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  addNewUser(user){
    debugger
    return this.http.post(`${hostName}/api/${user.dtype}/new`, user).pipe(
      tap( v => {
        debugger
        console.log(v)
      }),
      
    );
  }

  getAllArtists(){
    let url = `${hostName}/api/artist/all`;
    return this.http.get(url, this.httpOptions);
  }
}

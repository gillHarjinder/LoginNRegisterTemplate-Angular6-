import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // property for tokken and user
  authToken: any;
  user: any;


  // URL of backend
  private backendURL = 'http://localhost:3333';
  private userURL = '/users';


  constructor(private http:Http) { }


  /**
   * this fuction is to register user 
   * to backend(send request to backend)
   * @param user (object)
   * setup header and setting up value to headers
   */
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.backendURL+this.userURL+'/register', user,{headers: headers})
    .pipe(map(res => res.json()));
  }


  // this request going to bring back tokken
  authenticateUser(user){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.backendURL+this.userURL+'/authenticate', user,{headers: headers})
    .pipe(map(res => res.json()));
  }


  // here we storing token
  // in JWT it used 'id_token'
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    // we storing in string because localStorage not store 
    // as object, so later we have to convert back to JSON
    // when we bring back
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }


  // this will logout the user
  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}

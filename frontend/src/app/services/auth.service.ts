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
    return this.http.post('http://localhost:3333/users/register', user,{headers: headers})
    .pipe(map(res => res.json()));
  }

}

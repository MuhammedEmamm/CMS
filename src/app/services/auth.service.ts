import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { endpoint } from '../services/config';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private Cookie: CookieService) { }
  Val: Boolean;
  isAuthenticated() {
    return this.Val;
  }
  login(credentials) {
    return this.http.post(endpoint('Login'), credentials);
  }
  JoinUs(Data) {
    return this.http.post(endpoint('JoinUs'), Data);
  }
  loginAdmin(credentials) {
    return this.http.post(endpoint('LoginAdmin'), credentials);
  }
}

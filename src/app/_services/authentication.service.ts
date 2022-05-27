import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { User } from '../_models/user';
import {TranslateService} from '@ngx-translate/core';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient, private translate: TranslateService) {
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(this.getUser()));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public get currentAuthToken(): User {
    return this.getAuthToken();
  }

  login(email: string, password: string, remember: boolean) {
    return this.http.post<any>(`${environment.apiUrl}login`, { user: { email, password } }, { observe: 'response' as 'body' })
      .pipe(map((response: HttpResponse<any>) => {
        let user = response.body;
        
        if (remember) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          localStorage.setItem('currentToken', response.headers.get('Authorization') || '');
        } else {
          sessionStorage.setItem('currentUser', JSON.stringify(user));
          sessionStorage.setItem('currentToken', response.headers.get('Authorization') || '');
        }

        this.currentUserSubject.next(user);
        this.translate.use(user.lang);
        return user;
      }));
  }

  getUser() {
    let user: any = sessionStorage.getItem('currentUser');
    if (!user) { user = localStorage.getItem('currentUser'); }

    return user;
  }
  setUser(user: any) {
    sessionStorage.setItem('currentUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  getAuthToken() {
    let token: any = sessionStorage.getItem('currentToken');
    if (!token) { token = localStorage.getItem('currentToken'); }

    return token;
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    sessionStorage.removeItem('currentUser');
    localStorage.removeItem('currentToken');
    sessionStorage.removeItem('currentToken');
    this.currentUserSubject.next(null);
  }
}

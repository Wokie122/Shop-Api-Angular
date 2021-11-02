import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, map} from 'rxjs/operators';

export interface Login{
  login: string;
  haslo: string;
}

export interface LoginRes{
  token: string;
  rola: string;
}


@Injectable({
  providedIn: 'root'
})
export class AutoryzacjaService {
  zmianaStanuUzytkownika: EventEmitter<void> = new EventEmitter<void>();

  constructor(private http: HttpClient) { }

  pobierzZalogowanegoUzytkownika(): LoginRes | null {
    let loginRes = JSON.parse(sessionStorage.getItem('uzytkownik')) as LoginRes;
    if (loginRes != null && this.czyTokenJestPrzeterminowany(loginRes.token)){
      this.wyloguj();
      loginRes = null;
    }
    return loginRes;
  }

  private czyTokenJestPrzeterminowany(token: string): boolean {
    token.split('.').forEach(c => {
      try{
        console.log(atob(c));
      }
      catch{
        console.log('Oryginał: ' + c);
      }
    });
    let dataWaznosci = (JSON.parse(atob(token.split('.')[1]))).exp;
    let aktualnyCzas = Math.floor((new Date()).getTime() / 1000);
    return aktualnyCzas >= dataWaznosci;
  }


  login(login: Login): Observable<boolean>{
    return this.http.post<LoginRes>('https://localhost:44319/api/Login', login).pipe(map(res => {
      sessionStorage.setItem('uzytkownik', JSON.stringify(res));
      this.zmianaStanuUzytkownika.emit();
      return true;
    }), catchError(error => {
      return of(false);
    }));
  }

  wyloguj(){
    sessionStorage.removeItem('uzytkownik');
    this.zmianaStanuUzytkownika.emit();
  }
}

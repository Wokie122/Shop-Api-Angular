import { Injectable } from '@angular/core';
import { Artykul } from 'models/artykul';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {AutoryzacjaService} from '../autoryzacja/autoryzacja.service';

export interface Stronnicowanie{
  strona: number;
  ilosc: number;
}

@Injectable({
  providedIn: 'root'
})

export class ArtykulyService {
  private aktualizacja: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private http: HttpClient, private autoryzacja: AutoryzacjaService) {}

  pobierzArtykuly(stronnicowanie: Stronnicowanie): Observable<Artykul[]> {
    return this.http.get<Artykul[]>('https://localhost:44319/api/Artykuly', {
      params: {
        strona: stronnicowanie.strona.toString(),
        ilosc: stronnicowanie.ilosc.toString()
      }, headers: this.dodajNaglowek()
    });
  }

  pobierzArtykul(id: number ): Observable<Artykul>{
    return this.http.get<Artykul>('https://localhost:44319/api/Artykuly' + id, { headers: this.dodajNaglowek() });
  }

  zmienArtykul(id: number, artykul: Artykul): Observable<Artykul> {
    return this.http.put<Artykul>('https://localhost:44319/api/Artykuly' + id, artykul, { headers: this.dodajNaglowek() })
      .pipe(
        tap(res => this.aktualizacja.next('Dokonano edycji artykulu'))
      );
  }
  dodajArtykul(artykul: Artykul): Observable<Artykul> {
    return this.http.post<Artykul>('https://localhost:44319/api/Artykuly', artykul, { headers: this.dodajNaglowek() })
      .pipe(
        tap(res => this.aktualizacja.next('Dodano nowy obiekt'))
      );
  }

  private dodajNaglowek(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.autoryzacja.pobierzZalogowanegoUzytkownika()?.token);
  }
}


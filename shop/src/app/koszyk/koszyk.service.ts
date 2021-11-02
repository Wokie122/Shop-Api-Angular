import { Injectable } from '@angular/core';
import { Artykul } from 'models/artykul';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AutoryzacjaService} from '../autoryzacja/autoryzacja.service';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  wybraneArtykuly: BehaviorSubject<Artykul[]> = new BehaviorSubject<Artykul[]>([]);

  constructor(private http: HttpClient, private autoryzacja: AutoryzacjaService) {
    this.http.get<Artykul[]>('https://localhost:44319/api/Koszyk')
      .subscribe(
        (data: any) => {
          this.wybraneArtykuly.next(data);
        }
      );
  }

  pobierzKoszyk(): Observable<Artykul[]>{
    return this.wybraneArtykuly.asObservable();
  }

  wyczyscKoszyk(): Observable<Artykul[]>{
    this.http.put('https://localhost:44319/api/Koszyk', null, { headers: this.dodajNaglowek() })
      .subscribe(
        (data: any) => {
          this.wybraneArtykuly.next(data);
        }
      );
    return this.pobierzKoszyk();
  }

  dodajDoKoszyka(artykul: Artykul): Observable<Artykul[]>{
    this.http.post('https://localhost:44319/api/Koszyk', artykul.id, { headers: this.dodajNaglowek() })
      .subscribe(
        (data: any) => {
          this.wybraneArtykuly.next(data);
        }
      );
    return this.pobierzKoszyk();
  }

  private dodajNaglowek(): HttpHeaders {
    return new HttpHeaders().set('Authorization', 'Bearer ' + this.autoryzacja.pobierzZalogowanegoUzytkownika()?.token);
  }
}

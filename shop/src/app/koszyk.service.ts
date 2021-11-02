import { Injectable } from '@angular/core';
import { Artykul } from 'models/Artykul';
import { BehaviorSubject, Observable, of } from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class KoszykService {

  wybraneArtykuly: BehaviorSubject<Artykul[]> = new BehaviorSubject<Artykul[]>([]);

  constructor(private http: HttpClient) {
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
    this.http.put('https://localhost:44319/api/Koszyk', null)
      .subscribe(
        (data: any) => {
          this.wybraneArtykuly.next(data);
        }
      );
    return this.pobierzKoszyk();
  }

  dodajDoKoszyka(artykul: Artykul): Observable<Artykul[]>{
    this.http.post('https://localhost:44319/api/Koszyk', artykul.id)
      .subscribe(
        (data: any) => {
          this.wybraneArtykuly.next(data);
        }
      );
    return this.pobierzKoszyk();
  }
}

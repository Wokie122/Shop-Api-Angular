import { Injectable } from '@angular/core';
import { Artykul } from 'models/artykul';
import { BehaviorSubject, Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface Stronnicowanie{
  strona: number;
  ilosc: number;
}

@Injectable({
  providedIn: 'root'
})

export class ArtykulyService {

  constructor(private http: HttpClient) {}

  pobierzArtykuly(stronnicowanie: Stronnicowanie): Observable<Artykul[]> {
    return this.http.get<Artykul[]>('https://localhost:44319/api/Artykuly', {
      params: {
        strona: stronnicowanie.strona.toString(),
        ilosc: stronnicowanie.ilosc.toString()
      }
    });
  }
}


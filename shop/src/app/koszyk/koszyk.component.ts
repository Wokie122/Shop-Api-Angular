import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artykul } from 'models/artykul';
import { ArtykulyService } from '../artykuly/artykuly.service';
import { KoszykService } from './koszyk.service';

@Component({
  selector: 'app-koszyk',
  templateUrl: './koszyk.component.html',
  styleUrls: ['./koszyk.component.css']
})
export class KoszykComponent implements OnInit {

  koszyk: Artykul[] = [];
  licznik: number = 0;

  wybrany: boolean = false;

  constructor(private koszykService: KoszykService) { }

  ngOnInit(): void {
    this.koszykService.pobierzKoszyk().subscribe(artykuly => {
      this.koszyk = artykuly;
      this.licznik = this.koszyk.length;
    });
  }

  wyczyscKoszyk(): void{
    this.koszykService.wyczyscKoszyk();
    this.licznik = 0;
  }
}

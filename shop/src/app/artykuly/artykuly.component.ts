import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Artykul } from 'models/artykul';
import {ArtykulyService, Stronnicowanie} from './artykuly.service';
import { KoszykService } from '../koszyk/koszyk.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-artykuly',
  templateUrl: './artykuly.component.html',
  styleUrls: ['./artykuly.component.css']
})
export class ArtykulyComponent implements OnInit {

  @Input() artykul: Artykul;


  stronnicowanie: Stronnicowanie = {
    strona: 0,
    ilosc: 4
  };

  artykuly: Artykul[] = [];

  constructor(private artykulyService: ArtykulyService, private koszykService: KoszykService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {this.odswiez(); }

  dodajDoKoszyka(artykul: Artykul) {
    this.koszykService.dodajDoKoszyka(artykul);
  }
  przejdzDoEdycji(){
    this.router.navigateByUrl('artykuly/' + this.artykul.id);
  }
  odswiez() {
    this.artykulyService.pobierzArtykuly(this.stronnicowanie).subscribe(artykuly => {this.artykuly = artykuly; });
  }
}

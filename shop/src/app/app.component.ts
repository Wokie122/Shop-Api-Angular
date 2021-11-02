import {Component, Input} from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Artykul } from 'models/artykul';
import {ArtykulyService, Stronnicowanie} from './artykuly.service';
import { KoszykService } from './koszyk.service';
import {ArtykulyComponent} from './artykuly/artykuly.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  stronnicowanie: Stronnicowanie = {
    strona: 1,
    ilosc: 1
  };

  title = 'shop';
  licznik: number = 0;
  artykuly: Artykul[] = [];

  constructor(private appTitle: Title, private artykulyService: ArtykulyService, private koszykService: KoszykService){}

  ngOnInit(){
    this.appTitle.setTitle("Shop");
  }

  onArtykulClick(val: boolean){
    if(val)this.licznik++;
    else this.licznik--;
  }
}

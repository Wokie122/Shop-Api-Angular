import {Directive, HostBinding, HostListener} from '@angular/core';

@Directive({
  selector: '[appCzerwonyTekst]'
})
export class CzerwonyTekstDirective {

  @HostBinding('style.color') kolor = 'red';
  @HostBinding('class.duzy-tekst') duzyTekst = false;

  @HostListener('mouseover') mouseover(){
    this.kolor = 'yellow';
    this.duzyTekst = true;
  }

  @HostListener('mouseout') mouseout(){
    this.kolor = 'red';
    this.duzyTekst = false;
  }

  constructor() { }
}

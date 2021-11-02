import {Directive, TemplateRef, ViewContainerRef} from '@angular/core';
import {AutoryzacjaService} from './autoryzacja.service';

@Directive({
  selector: '[appAutoryzacja]'
})
export class AutoryzacjaDirective {
  private elementIstnieje = false;

  constructor(private templateRef: TemplateRef<any>, private vc: ViewContainerRef, private autoryzacjaService: AutoryzacjaService) {
    autoryzacjaService.zmianaStanuUzytkownika.subscribe(() => this.sprawdzUzytkownika());
  }

  private sprawdzUzytkownika(){
    if(this.autoryzacjaService.pobierzZalogowanegoUzytkownika() != null){
      if(!this.elementIstnieje){
        this.vc.createEmbeddedView(this.templateRef);
        this.elementIstnieje = true;
      }
    }
    else{
      if(this.elementIstnieje){
        this.vc.clear();
        this.elementIstnieje = false;
      }
    }
    console.log(this.vc.element.nativeElement);
    console.log(this.templateRef.elementRef.nativeElement);
  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ArtykulyService} from '../artykuly/artykuly.service';
import {Artykul} from '../../../models/artykul';

@Component({
  selector: 'app-formularz',
  templateUrl: './formularz.component.html',
  styleUrls: ['./formularz.component.css']
})
export class FormularzComponent implements OnInit {
  form: FormGroup;
  id: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private artykulyService: ArtykulyService, private router: Router) { }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.id = Number.parseInt(this.route.snapshot.paramMap.get('id'));
    if(this.id > 0){
      this.artykulyService.pobierzArtykul(this.id).subscribe(o => this.createForm(o));
    }else{
      this.createForm(null);
    }
  }

  private createForm(artykul?: Artykul){
    this.form = this.fb.group({
      nazwa: new FormControl(artykul?.nazwa, [Validators.required, Validators.minLength(2), Validators.maxLength(100)]),
      cena: new FormControl(artykul?.cena, [Validators.required, Validators.min(0), Validators.max(1000)]),
      opis: new FormControl(artykul?.opis, [Validators.required, Validators.max(300)])
    });

    this.form.controls['nazwa'].valueChanges.subscribe(nowaNazwa => {
      console.log(nowaNazwa);
      this.form.controls['nazwa'].setValue(nowaNazwa);
    });

    this.form.controls['cena'].valueChanges.subscribe(nowaCena => {
      console.log(nowaCena);
      this.form.controls['cena'].setValue(nowaCena);
    });

    this.form.controls['opis'].valueChanges.subscribe(nowyOpis => {
      console.log(nowyOpis);
      this.form.controls['opis'].setValue(nowyOpis);
    });
  }

  onSubmit(){
    if(this.id > 0){
      this.artykulyService.zmienArtykul(this.id, this.form.value).subscribe(o => this.router.navigateByUrl('artykuly'));
    }else{
      this.artykulyService.dodajArtykul(this.form.value).subscribe(o => this.router.navigateByUrl('artykuly'));
    }
  }
}

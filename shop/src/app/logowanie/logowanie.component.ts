import { Component, OnInit } from '@angular/core';
import {AutoryzacjaService, Login} from '../autoryzacja/autoryzacja.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-logowanie',
  templateUrl: './logowanie.component.html',
  styleUrls: ['./logowanie.component.css']
})
export class LogowanieComponent implements OnInit {
  login: Login = {
    haslo: null,
    login: null
  };

  blad: string;

  constructor(private autoryzacjaService: AutoryzacjaService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.autoryzacjaService.login(this.login).subscribe(res => {
      if (res) {
        this.router.navigateByUrl('');
      } else {
        this.blad = 'Niepoprawny login lub hasło!';
      }
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from "../../_services/authentication.service";

@Component({
  selector: 'app-nueva-partida',
  templateUrl: './nueva-partida.component.html',
  styleUrls: ['./nueva-partida.component.scss'],
})

export class NuevaPartidaComponent implements OnInit, OnDestroy {

  juegosForm:FormGroup;
  submittedJuego = false;
  loadingJuego = false;
  isChecked: boolean;
  checkValue:any;
  events: string[] = [];
  currentDateTime: string;
  dateInterval: any;
  dashboard: any;
  profile: any;
  authenticationService: any;
  x: any;
  gameId: any;
  game: any;



  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    this.events.push(`${type}: ${event.value}`);
  }

  constructor(    
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dateAdapter: DateAdapter<Date>,
    private route: ActivatedRoute
  ) { 
    this.dateAdapter.setLocale('es-ES'); //dd/MM/yyyy
  }
  
  ngOnInit(): void {
    this.gameId = this.route.snapshot.paramMap.get("id");
    this.http.get(environment.apiUrl + 'games/' + this.gameId)
        .subscribe((response: any) => {
          this.game = response;
          console.log(this.game);
          this.setGame();
        })

    this.dateInterval = setInterval(() => {
      this.setCurrentDateTime();
    }, 1000);

    this.juegosForm = this.formBuilder.group({
      juego_key:['', Validators.required],
      digiKudos:['', []],
      digiCrea:['', []],
      digiReta:['', []],
      time_key:['', Validators.required],
      now:['',[]],
      later:['',[]],
      starts_at:['',[]],
      picker:['',[]]
    })
  }
  setGame(){

    this.onCheckboxChange({ checked: true }, this.game.kind );
    this.onCheckboxChangeTime({ checked: true}, this.game.status);
    this.j['starts_at'].setValue(this.game.starts_at);
  }

  currentDate = new Date();  //moment
  todaysDataTime = '';

  get j() { return this.juegosForm.controls; }

  onJuegosSubmit() {
    
    if (this.loadingJuego) { return; }
    this.submittedJuego = true;
    if (this.juegosForm.invalid) {
      console.log('Form invalid');
      return;
    }
    const params = { 
      kind: this.j['juego_key'].value,
      status:this.j['time_key'].value,
      starts_at:this.j['picker'].value
    };
    console.log(params);

    this.loadingJuego = true;
    console.log(params);
    this.http.put(environment.apiUrl + 'games/' + this.gameId, params)
        .subscribe((response: any) => {
          this.game = response;
          console.log(this.game);
          this.setGame();

          this.loadingJuego = false; 
        }, (error) => {
          this.loadingJuego = false;
        }
        );
  }
  onCheckboxChange(j: any, inputKey: number){
    this.j['juego_key'].setValue(inputKey);
    switch(inputKey) {
      case (1):
        if (j.checked) {
          this.j['juego_key'].setValue(inputKey);
        } else {
          this.j['juego_key'].setValue(1);
        }
        break;
      case (2):
        if (j.checked) {
          this.j['juego_key'].setValue(inputKey);
        } else {
          this.j['juego_key'].setValue(2);
        }
        break;
      case (3):
        if (j.checked) {
          this.j['juego_key'].setValue(inputKey);
        } else {
          this.j['juego_key'].setValue(3);
        }
        break;
    }

      switch(this.j['juego_key'].value) {
        case (2):
          this.j['digiKudos'].setValue(true);
          this.j['digiCrea'].setValue(false);
          this.j['digiReta'].setValue(false);
          break;
        case (1):
          this.j['digiCrea'].setValue(true);
          this.j['digiKudos'].setValue(false);
          this.j['digiReta'].setValue(false);
          break;
        case (3):
          this.j['digiReta'].setValue(true);
          this.j['digiCrea'].setValue(false);
          this.j['digiKudos'].setValue(false);
      }
  }
  onCheckboxChangeTime(t:any ,inputTimeKey: number){    
    switch(inputTimeKey) {
      case (2):
        if (t.checked) {
          this.j['time_key'].setValue(inputTimeKey);
        } else {
          this.j['time_key'].setValue(1);
        }
        break;
      case (1):
        if (t.checked) {
          this.j['time_key'].setValue(inputTimeKey);
        } else {
          this.j['time_key'].setValue(2);
        }
        break;
    }
    switch(this.j['time_key'].value) {
      case (2):
        this.j['now'].setValue(true);
        this.j['later'].setValue(false);
        break;
      case (1):
        this.j['now'].setValue(false);
        this.j['later'].setValue(true);
        break;
    }
        console.log(this.j['time_key'].value);

  }

  setCurrentDateTime() {
    this.currentDateTime = moment().format('hh:mm:ss  DD-MM-yyyy');
  }

  ngOnDestroy(): void {
    clearInterval(this.dateInterval);
  }



}
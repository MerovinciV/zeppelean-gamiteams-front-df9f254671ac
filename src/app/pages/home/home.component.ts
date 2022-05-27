import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import { AuthenticationService } from 'src/app/_services/authentication.service';
import {Clipboard} from '@angular/cdk/clipboard';
import * as moment from 'moment';


@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    currentUser;
    games: any = [];
    enviroment: any = environment;

    constructor(
        private http: HttpClient,
        private authenticationService: AuthenticationService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
        }

    ngOnInit(): void {
        this.requestData();
    }

    requestData() {
        this.http.get(environment.apiUrl + 'dashboard')
            .subscribe((response: any) => {
                this.games = response.games;
            });
    }

    getGameKindLogo(kind: any) {
        switch (kind) {
            case 1:
                return './assets/img/logo_DC.svg';
            case 2:
                return './assets/img/logo_DK.svg';
            case 3:
                return './assets/img/logo_DR.svg';
            default:
                console.log('No hay img');
                return;
        }
    }

    getGameStatus(status: any) {
        switch (status) {
            case 1:
                return 'PROGRAMADA';
            case 2:
                return 'ACTIVA';
            case 3:
                return 'FINALIZADA';
            default:
                return '';
        }
    }

    getStartsAt(date: any){
        return moment(date).format('LLL');    }
}

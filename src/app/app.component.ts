import {Component, OnInit} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import {Router} from "@angular/router";
import {environment} from "../environments/environment";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    hideHelpOn = ['/login', '/FAQ'];

    constructor(
      public translate: TranslateService,
      public router: Router
    ){
      translate.addLangs(['en', 'es']);
      translate.setDefaultLang('es');
      translate.use('es');
    }

    ngOnInit() {
        console.log(environment.env);
        if (environment.env === 'staging' && location.protocol === 'https:') {
            window.location.href = location.href.replace('https', 'http');
        }
    }

    switchLanguage(lang: string){
      this.translate.use(lang);
    }

    showHelpIcon() {
        return this.hideHelpOn.indexOf(this.router.url) < 0;
    }

}


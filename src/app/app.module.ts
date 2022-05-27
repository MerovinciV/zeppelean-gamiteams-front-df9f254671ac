import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NuevaPartidaComponent } from './pages/nueva-partida/nueva-partida.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule} from '@angular/material/form-field';
import { MatMomentDateModule } from "@angular/material-moment-adapter";
import {MatGridListModule} from '@angular/material/grid-list';
import {ComprarTokensComponent} from './pages/comprar-tokens/comprar-tokens.component';
import { PagoTokensComponent } from './pages/pago-tokens/pago-tokens.component';
import { CompraFacturaComponent } from './pages/compra-factura/compra-factura.component';
import { ConfigurarCuentaComponent } from './pages/configurar-cuenta/configurar-cuenta.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { CrearDatospagoComponent } from './pages/crear-datospago/crear-datospago.component';
import { FAQComponent } from './pages/faq/faq.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { ResetPassComponent } from './_components/dialogs/reset-pass/reset-pass.component';

//Traductor Idiomas
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { ForgotPasswordComponent } from './_components/dialogs/forgot-password/forgot-password.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { ClipboardModule } from '@angular/cdk/clipboard';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    NuevaPartidaComponent,
    CrearCuentaComponent,
    ComprarTokensComponent,
    PagoTokensComponent,
    CompraFacturaComponent,
    ConfigurarCuentaComponent,
    FacturasComponent,
    CrearDatospagoComponent,
    FAQComponent,
    ResetPassComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCheckboxModule,
    FlexLayoutModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatMomentDateModule,
    MatFormFieldModule,
    MatGridListModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    ClipboardModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]

    }
    })
  ],
  providers: [
    CookieService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

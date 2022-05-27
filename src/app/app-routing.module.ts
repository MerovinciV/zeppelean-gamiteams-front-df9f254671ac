import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompraFacturaComponent } from './pages/compra-factura/compra-factura.component';
import { ComprarTokensComponent } from './pages/comprar-tokens/comprar-tokens.component';
import { ConfigurarCuentaComponent } from './pages/configurar-cuenta/configurar-cuenta.component';
import { CrearCuentaComponent } from './pages/crear-cuenta/crear-cuenta.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NuevaPartidaComponent } from './pages/nueva-partida/nueva-partida.component';
import { PagoTokensComponent } from './pages/pago-tokens/pago-tokens.component';
import { CrearDatospagoComponent } from './pages/crear-datospago/crear-datospago.component';
import { FAQComponent } from './pages/faq/faq.component';
import { AuthGuard } from './_helpers/auth.guard';

//admin@beprisma.com
//123456lL@

const routes: Routes = [
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: 'crear-cuenta', component: CrearCuentaComponent},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'games', component: NuevaPartidaComponent, canActivate: [AuthGuard] },
  { path: 'games/:id', component: NuevaPartidaComponent, canActivate: [AuthGuard] },
  { path: 'comprar-tokens', component: ComprarTokensComponent, canActivate: [AuthGuard] },
  { path: 'pago-tokens', component: PagoTokensComponent, canActivate: [AuthGuard] },
  { path: 'compra-factura', component: CompraFacturaComponent, canActivate: [AuthGuard] },
  { path: 'configurar-cuenta', component: ConfigurarCuentaComponent, canActivate: [AuthGuard] },
  { path: 'facturas', component: FacturasComponent, canActivate: [AuthGuard] },
  { path: 'crear-datospago', component: CrearDatospagoComponent, canActivate: [AuthGuard] },
  { path: 'FAQ', component: FAQComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

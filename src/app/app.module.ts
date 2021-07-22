import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthModule } from './modules/auth.module';
import { AuthRoutingModule } from './modules/auth-routing.module';
import { StreamsModule } from './modules/streams/streams.module';
import { StreamsRoutingModule } from './modules/streams-routing/streams-routing.module';
import { CookieService } from 'ngx-cookie-service'
import { from } from 'rxjs';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token-interceptor';
import { TokenService } from './services/token.service';
// import {NgxAutoScrollModule} from 'ngx-auto-scroll';










@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    // NgxAutoScrollModule,
    AuthRoutingModule,
    StreamsModule,
    StreamsRoutingModule

  ],
  providers: [CookieService, {
    provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

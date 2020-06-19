import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home/home.module';
import { FeaturesModule } from './features/features.module';
import { GalleryModule } from './gallery/gallery.module';
import { PricingModule } from './pricing/pricing.module';
import { ContactModule } from './contact/contact.module';
import { FooterModule } from './footer/footer.module';
import { PageHeaderModule } from './page-header/page-header.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    // page Moduls
    HomeModule, FeaturesModule, GalleryModule, PricingModule, ContactModule, FooterModule, PageHeaderModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AccommodationOverviewComponent } from './accommodation-overview/accommodation-overview.component';
import { AccommodationRoutingModule } from './accommodation-routing.module';
import { AccommodationService } from './accommodation.service';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccommodationCreateComponent } from './accommodation-create/accommodation-create.component';
import { AlertModule } from '../alert/alert.module';
import { AuthModule } from '../auth/auth.module';
import { AccommodationApproveComponent } from './accommodation-approve/accommodation-approve.component';
import { AccommodationComponent } from './accommodation.component';

@NgModule({
  declarations: [
    AccommodationComponent,
    AccommodationOverviewComponent,
    AccommodationCreateComponent,
    AccommodationApproveComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    AccommodationRoutingModule,
    AlertModule
  ],
  providers: [
    AccommodationService
  ],
  exports: []
})
export class AccommodationModule { }

import '../../src/polyfills.ts';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { ReactiveFormsModule, FormsModule }    from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { JwtInterceptor, ErrorInterceptor, BackendProvider} from './_helpers';
import { FooterComponent } from './footer/footer.component';
import { MenuComponent } from './menu/menu.component';
import { BuyComponent } from './buy/buy.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatFormFieldModule
} from '@angular/material';

import {CdkTableModule} from '@angular/cdk/table';
import { SellComponent } from './sell/sell.component';
import { NgbdSortableHeader } from './sortable.directive';
import { DialogsModule } from './dialogs/dialogs.module';
import { ProgressSpinnerComponent } from './progress-spinner/progress-spinner.component';
import { BuyModuleComponent } from './buy-module/buy-module.component';


@NgModule({
  exports: [
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatFormFieldModule
  ],
})
export class DemoMaterialModule {}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    HomeComponent,
    RegisterComponent,
    FooterComponent,
    MenuComponent,
    BuyComponent,
    SellComponent,
    NgbdSortableHeader,
    ProgressSpinnerComponent,
    BuyModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    DemoMaterialModule,
    NgbModule,
    DialogsModule,
    MatFormFieldModule
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    // { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    // BackendProvider
  ],
  entryComponents: [AppComponent, ProgressSpinnerComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }

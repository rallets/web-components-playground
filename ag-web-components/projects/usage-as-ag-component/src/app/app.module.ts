import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TextFormComponent } from 'projects/web-components/src/app/text-form/text-form.component';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponentWrapperDirective } from './web-component-wrapper/web-component-wrapper.directive';

@NgModule({
	declarations: [
		AppComponent,
		TextFormComponent,
		WebComponentWrapperDirective,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent],
	schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }

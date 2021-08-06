import { DoBootstrap, Injector, NgModule } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { TextFormComponent } from './text-form/text-form.component';

@NgModule({
	declarations: [
		TextFormComponent
	],
	imports: [
		BrowserModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [
		// TextFormComponent
	],
	entryComponents: [
		TextFormComponent
	],
})
export class AppModule implements DoBootstrap {

	constructor(private injector: Injector) {
		const webComponent = createCustomElement(TextFormComponent, { injector });
		customElements.define('text-form', webComponent);
	}

	ngDoBootstrap() { }
}

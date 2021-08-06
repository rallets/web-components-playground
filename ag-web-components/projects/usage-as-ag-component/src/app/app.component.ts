import { AfterViewInit, Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	// encapsulation: ViewEncapsulation.ShadowDom
})
export class AppComponent implements AfterViewInit {

	constructor(
		private elementRef: ElementRef
	) { }

	textForm1 = "";

	textFormSaved1(value: string) {
		console.log(value);
		this.textForm1 = value;
	}

	textForm2 = "";

	ngAfterViewInit() {
		// based on: https://stackoverflow.com/a/41610950/3512682
		this.elementRef.nativeElement
			.querySelector('#textForm2')
			.addEventListener('saved', this.textFormSaved2.bind(this));
	}

	textFormSaved2(event: CustomEvent) {
		console.log(event.detail);
		this.textForm2 = event.detail;
	}

	textForm3 = new FormControl('text form 3', Validators.minLength(2));

	textForm4 = 'text form 4';
}

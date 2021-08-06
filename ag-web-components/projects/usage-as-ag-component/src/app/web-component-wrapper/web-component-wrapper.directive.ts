import { Directive, ElementRef, forwardRef, HostListener } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Directive({
	selector: 'text-form',
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => WebComponentWrapperDirective),
			multi: true
		}
	]
})
export class WebComponentWrapperDirective implements ControlValueAccessor {

	// based on: https://coryrylan.com/blog/using-web-components-in-angular-forms
	// note that we are importing the built web component in angular.json > scripts > main.js

	// constructor() { }

	onChange: any = () => { };
	onTouched: any = () => { };

	private _value: string = '';

	get value() {
		return this._value;
	}

	set value(val) {
		if (val !== this._value) {
			this._value = val;
			this.onChange(this._value);
			this.onTouched();
			// this.elementRef.nativeElement.value = val;
			this.elementRef.nativeElement.initialValue = val;
		}
	}

	constructor(private elementRef: ElementRef) { }

	@HostListener('saved', ['$event.detail'])
	listenForValueChange(value: string) {
		this.value = value;
	}

	writeValue(value: string) {
		if (value) {
			this.value = value;
		}
	}

	registerOnChange(fn: any) {
		this.onChange = fn;
	}

	registerOnTouched(fn: any) {
		this.onTouched = fn;
	}
}

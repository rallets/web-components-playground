import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
	selector: 'app-text-form',
	templateUrl: './text-form.component.html',
	styleUrls: ['./text-form.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
})
export class TextFormComponent implements OnInit {

	private _initialValue = '';

	@Input()
	get initialValue(): string { return this._initialValue; }
	set initialValue(value: string) {
		this._initialValue = (value && value.trim()) || '';
		this.ctrl.setValue(this._initialValue);
	}

	@Output()
	saved = new EventEmitter<string>();

	ctrl = new FormControl('');

	constructor() { }

	ngOnInit(): void {
	}

	onSave() {
		this.saved.emit(this.ctrl.value);
	}

}

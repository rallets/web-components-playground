import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent implements OnInit {

	private _defaultValue = '';

	@Input('xxx')
	get defaultValue(): string { return this._defaultValue; }
	set defaultValue(value: string) {
		this._defaultValue = (value && value.trim()) || '';
		this.ctrl.setValue(this._defaultValue);
	}
	
	ctrl = new FormControl('');
	
  constructor() { }

  ngOnInit(): void {
  }

}

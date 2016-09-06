import {Component} from '@angular/core';
import {DatePicker} from 'ng2-datepicker/ng2-datepicker';

@Component({
  selector: 'calculator',
  directives: [DatePicker],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Calculator {

  constructor() {
    // Do stuff
  }
}

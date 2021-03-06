import {Component} from '@angular/core';

import {Calculator} from '../../components/calculator';
import {Title} from '../../components/title';

@Component({
  selector: 'home',
  directives: [Calculator, Title],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Home {

  constructor() {
    // Do stuff
  }
}

import {Component} from '@angular/core';

import {Test} from '../../components/test';

@Component({
  selector: 'home',
  directives: [Test],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Home {

  constructor() {
    // Do stuff
  }
}

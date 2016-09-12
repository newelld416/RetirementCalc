import {Component} from '@angular/core';

@Component({
  selector: 'calculator',
  directives: [],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Calculator {
    private hasPensionBenefits: boolean;
    private hasSocialSecurityBenefits: boolean;

    constructor() {
        this.hasPensionBenefits = false;
        this.hasSocialSecurityBenefits = false;
    }

    testChange(event, value){
        debugger;
    }

    togglePensionBenefits(value) {
        this.hasPensionBenefits = value;
    }

    toggleSocialSecutiryBenefits(value) {
        this.hasSocialSecurityBenefits = value;
    }
}

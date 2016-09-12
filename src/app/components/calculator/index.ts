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

    private currentStep: number;

    constructor() {
        this.hasPensionBenefits = false;
        this.hasSocialSecurityBenefits = false;
        this.currentStep = 1;
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

    updateCurrentStep(step) {
        this.currentStep = step;
        return false;
    }
}

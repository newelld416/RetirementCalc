import {Component} from '@angular/core';

import {BrowserStorage} from '../../services/browserstorage';

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

    name: string;
    email: string;
    birthday: any;

    constructor() {
        this.hasPensionBenefits = false;
        this.hasSocialSecurityBenefits = false;
        this.currentStep =  BrowserStorage.getData("currentStep") || 1;
    }

    updateInput(propertyName, propertyValue){
        if (propertyName === 'name') {
            this.name = propertyValue;
        } else if (propertyName === 'email') {
            this.email = propertyValue;
        } else if (propertyName === 'birthday') {
            this.birthday = propertyValue;
        }
        debugger;
    }

    updateSlider() {

    }

    togglePensionBenefits(value) {
        let test = this.name;
        debugger;
        this.hasPensionBenefits = value;
    }

    toggleSocialSecutiryBenefits(value) {
        this.hasSocialSecurityBenefits = value;
    }

    updateCurrentStep(step) {
        this.currentStep = step;
        BrowserStorage.setData("currentStep", this.currentStep, false);
        return false;
    }

    resetClicked() {
        this.hasPensionBenefits = false;
        this.hasSocialSecurityBenefits = false;
    }

    emailResults() {

    }
}

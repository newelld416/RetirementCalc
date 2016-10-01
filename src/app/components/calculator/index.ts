import {Component} from '@angular/core';

import {BrowserStorage} from '../../services/browserstorage';
import {Utilities} from '../../services/utilities';
import {Collapse} from './Collapse';

@Component({
  selector: 'calculator',
  directives: [Collapse],
  pipes: [],
  styles: [require('./style.scss')],
  template: require('./template.html')
})

export class Calculator {
    private hasPensionBenefits: boolean;
    private hasSocialSecurityBenefits: boolean;
    private has401kPlan: boolean;
    private showResults: boolean;
    private emailSubject: string = "This is my email Subject";
    private emailBody: string = "This is my email Body";
    private currentStep: number;

    name: string;
    email: string;
    birthday: string;
    age: number;
    income: number = 48000;
    totalIncome: number;
    currentRetirementSavings: number = 0;
    replacementRate: number = 0;
    retirementIncome: number = 0;
    agePensionBenefitsStart: number = 0;
    annualPensionIncome: number = 0;
    monthlyPensionIncome: number = 0;
    inflationRateValue: number = 2;
    ageOfRetirementValue: number = 67;
    yearsOfRetirementValue: number = 20;
    annualSalaryGrowthValue: number = 2;
    yearsUntilRetirement: number;
    paycheckPercentage: number = 10;
    paycheckSavingsValue: number;

    isPersonalInfoCollapsed: boolean = false;
    isFinancesCollapsed: boolean = true;
    isPensionCollapsed: boolean = true;
    isSocialSecurityCollapsed: boolean = true;
    is401kCollapsed: boolean = true;
    isRetirementCriteriaCollapsed: boolean = true;

    constructor() {
        this.hasPensionBenefits = false;
        this.hasSocialSecurityBenefits = false;
        this.has401kPlan = false;
        this.showResults = false;
        this.currentStep =  BrowserStorage.getData("currentStep") || 1;
    }

    //This method is called when the initial user details are updated
    updateUserDetails(propertyName, propertyValue){
        if (propertyName === 'name') { this.name = propertyValue; } 
        else if (propertyName === 'email') { this.email = propertyValue; } 
        else if (propertyName === 'birthday') { this.calculateAge(propertyValue); }
        this.showResults = this.name !== undefined && this.email !== undefined && this.birthday !== undefined;
    }
    
    //Update step for calaculator component
    updateCurrentStep(step) {
        this.currentStep = step;
        BrowserStorage.setData("currentStep", this.currentStep, false);
        return false;
    }

    //Reset button clicked on input form
    resetClicked() {
        this.hasPensionBenefits = false;
        this.hasSocialSecurityBenefits = false;
        this.has401kPlan = false;
    }

    //Setter and Toggle Methods
    updateAgeOfRetirement(value) { 
        this.ageOfRetirementValue = value;
        this.yearsUntilRetirement = this.ageOfRetirementValue - this.age; 
    }

    updateYearsOfRetirement(value) { 
        this.yearsOfRetirementValue = value; 
    }

    updateAnnualSalaryGrowth(value) { 
        this.annualSalaryGrowthValue = value; 
    }

    updateInflationRate(value) { 
        this.inflationRateValue = value; 
    }

    updateIncome(value) {
        this.income = value;
        this.totalIncome = this.income * this.yearsUntilRetirement;
    }

    updateCurrentRetirementSavings(value) {
        this.currentRetirementSavings = value;
    }

    updateReplacementRate(value) {
        this.replacementRate = value;
    }

    updateReplacementRateChange() { 
        this.isPensionCollapsed = false;
    }

    updateRetirementIncome(value) {
        this.retirementIncome = value;
    }

    updatePayckeckPercentage(value) { 
        this.paycheckPercentage = value;
        this.paycheckSavingsValue = ((this.income / 26) / 100) * this.paycheckPercentage; 
        this.paycheckSavingsValue = Math.round(this.paycheckSavingsValue*100)/100;
    }

    updateAgePensionStarts(value) {
        this.agePensionBenefitsStart = value;
    }

    updateAnnualPensionIncome(value) {
        this.annualPensionIncome = value;
        this.monthlyPensionIncome = Math.round((this.annualPensionIncome / 12)*100)/100; 
    }

    togglePensionBenefits() { 
        this.hasPensionBenefits = !this.hasPensionBenefits;
    }

    toggleSocialSecutiryBenefits() { 
        this.hasSocialSecurityBenefits = !this.hasSocialSecurityBenefits; 
    }
    
    toggleFourOOneKPlan() { 
        this.has401kPlan = !this.has401kPlan;
        this.paycheckSavingsValue = ((this.income / 26) / 100) * this.paycheckPercentage; 
        this.paycheckSavingsValue = Math.round(this.paycheckSavingsValue*100)/100;
    };

    //Empty Methods
    emailResults() {}
    updateSlider() {}

    private calculateAge(propertyValue) {
        this.birthday = propertyValue;
        let birthDateArray = this.birthday.split('-');
        let birthDate = new Date(Number(birthDateArray[0]), Number(birthDateArray[1]), Number(birthDateArray[2]));
        this.age = Utilities.getAge(birthDate);
        this.yearsUntilRetirement = this.ageOfRetirementValue - this.age; 
        this.totalIncome = this.income * this.yearsUntilRetirement;
        this.isFinancesCollapsed = false;
    }
}

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
    private currentStep: number;
    private hasPensionBenefits: boolean;
    private hasSocialSecurityBenefits: boolean;
    private has401kPlan: boolean;
    private showResults: boolean;
    private emailSubject: string = "Retirement Plan Results";
    private emailBody: string = `Lorem <strong>ipsum</strong> dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.`;

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
        this.showResults = false;
    }

    //Setter and Toggle Methods
    updateAgeOfRetirement(value) { 
        this.ageOfRetirementValue = value;
        this.yearsUntilRetirement = this.ageOfRetirementValue - this.age; 
    }

    updateYearsOfRetirement(value) {  this.yearsOfRetirementValue = value; }
    updateAnnualSalaryGrowth(value) { this.annualSalaryGrowthValue = value; }
    updateInflationRate(value) { this.inflationRateValue = value; }
    updateCurrentRetirementSavings(value) { this.currentRetirementSavings = value; }
    updateReplacementRate(value) { this.replacementRate = value; }
    updateRetirementIncome(value) { this.retirementIncome = value; }
    updateAgePensionStarts(value) { this.agePensionBenefitsStart = value; }
    togglePensionBenefits() { this.hasPensionBenefits = !this.hasPensionBenefits; }
    toggleSocialSecutiryBenefits() { this.hasSocialSecurityBenefits = !this.hasSocialSecurityBenefits; }
    emailResults() {}
    updateSlider() {}

    updateIncome(value) {
        this.income = value;
        this.totalIncome = this.income * this.yearsUntilRetirement;
    }

    updatePayckeckPercentage(value) { 
        this.paycheckPercentage = value;
        this.paycheckSavingsValue = ((this.income / 26) / 100) * this.paycheckPercentage; 
        this.paycheckSavingsValue = Math.round(this.paycheckSavingsValue*100)/100;
    }

    updateAnnualPensionIncome(value) {
        this.annualPensionIncome = value;
        this.monthlyPensionIncome = Math.round((this.annualPensionIncome / 12)*100)/100; 
    }
    
    toggleFourOOneKPlan() { 
        this.has401kPlan = !this.has401kPlan;
        this.paycheckSavingsValue = ((this.income / 26) / 100) * this.paycheckPercentage; 
        this.paycheckSavingsValue = Math.round(this.paycheckSavingsValue*100)/100;
    };

    expandAll() { 
        this.isPersonalInfoCollapsed = false;
        this.isFinancesCollapsed = false;
        this.isPensionCollapsed = false;
        this.isSocialSecurityCollapsed = false;
        this.is401kCollapsed = false;
        this.isRetirementCriteriaCollapsed = false;
    };

    collapseAll() { 
        this.isPersonalInfoCollapsed = false;
        this.isFinancesCollapsed = true;
        this.isPensionCollapsed = true;
        this.isSocialSecurityCollapsed = true;
        this.is401kCollapsed = true;
        this.isRetirementCriteriaCollapsed = true;
    };

    private calculateAge(propertyValue) {
        this.birthday = propertyValue;
        let birthDateArray = this.birthday.split('-');
        let birthDate = new Date(Number(birthDateArray[0]), Number(birthDateArray[1]), Number(birthDateArray[2]));
        this.age = Utilities.getAge(birthDate);
        this.yearsUntilRetirement = this.ageOfRetirementValue - this.age; 
        this.totalIncome = this.income * this.yearsUntilRetirement;
    }
}

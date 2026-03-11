
import {Given,When,Then} from '@cucumber/cucumber';

import { getPage } from '../hooks/hooks';
//import type { World } from '@cucumber/cucumber';
//import type RegisterPage from '../pages/registerpage';
import { CustomWorld } from '../helper/types/custom';
import {expect} from '@playwright/test';



Given('user is on Login page', async function () {
      const urlPage= getPage().url();
       expect(urlPage).toContain('https://practice.automationtesting.in/my-account/')
       this.attach(urlPage);
});
When("user enters login details", async function (this:CustomWorld) {
     this.attach('user entering email and password')

     this.email =process.env.USER_NAME;
     this.password=process.env.PASSWORD;
     await this.loginPage.enterLoginEmail(this.email!);
     this.attach(`user entered email: ${this.email}`);
     await this.loginPage.enterLoginPassword(this.password!);
     this.attach(`user entered email: ${this.password}`);
     await this.loginPage.clickLogin();
  
});

When("user enters login details with out random", async function (this:CustomWorld) {
   
     await this.loginPage.enterLoginEmail(process.env.USER_NAME!);
     await this.loginPage.enterLoginPassword(process.env.PASSWORD!);
     await this.loginPage.clickLogin();
  
});



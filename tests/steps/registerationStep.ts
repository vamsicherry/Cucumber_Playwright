
import {Given,When,Then} from '@cucumber/cucumber';

import { getPage } from '../hooks/hooks';
//import type { World } from '@cucumber/cucumber';
//import type RegisterPage from '../pages/registerpage';
import { CustomWorld } from '../helper/types/custom';
import {expect} from '@playwright/test';
import { RandomDataUtil } from '../utils/RandomUtils';


Given('user is on registeration page', async function () {
      const urlPage= getPage().url();
       expect(urlPage).toContain('https://practice.automationtesting.in/my-account/')
       this.attach(urlPage);
});
When("user enters registeration details", async function (this:CustomWorld) {
  
  const email = RandomDataUtil.getEmail();
  this.attach(email);
  this.email=email;
  await this.registerPage.enterRegisterationEmail(email);
 
  this.attach(`user email is ${email}`);
  
  const password = RandomDataUtil.getPassword();
  await this.registerPage.enterRegisterationPassword(password);
  this.attach(password)
  this.password=password
  this.attach(`user password is ${password}`);

  await this.registerPage.clickRegister();
  this.attach(`user clicked on Registeration page`)
});

Then('verify account created or not', async function (this:CustomWorld) {
          await this.registerPage.isAccoutVisible();
         });

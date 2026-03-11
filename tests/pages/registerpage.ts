
import { Page } from 'playwright';
import BasePage from './basepage';

import * as registerationlocator from '../locators/registerationlocator.json';
import { expect } from '@playwright/test';
import { ICreateAttachment } from '@cucumber/cucumber/lib/runtime/attachment_manager';

export default class RegisterPage extends BasePage {


     constructor(page: Page,log: ICreateAttachment) {

          super(page,log)

     }


     async enterRegisterationEmail(input: string) {
          await this.enter(registerationlocator.RegisterEmail, input);

     }

     async enterRegisterationPassword(pass: string) {
          await this.enter(registerationlocator.RegisterPassword, pass);
     }

      async clickRegister() {
           

         //await this.page.locator("input[name='register'][type='submit'].woocommerce-Button.button").click();
         await this.page.locator("input[name='register']").dispatchEvent("click");

         //await  this.page.locator("input[name='register']").click({ force: true });


     } 

         

     async isAccoutVisible()
     {
          const value=  await this.page.locator('nav.woocommerce-MyAccount-navigation li a').first().textContent();

          expect(value).toContain('Dashboard');
     }







}
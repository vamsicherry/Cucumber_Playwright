
import { Page } from 'playwright';
import BasePage from './basepage';

import * as loginpagelocator from '../locators/loginlocator.json';
import { ICreateAttachment } from '@cucumber/cucumber/lib/runtime/attachment_manager';

export default class LoginPage extends BasePage {


     constructor(page: Page,log: ICreateAttachment) {

          super(page,log)

     }


     async enterLoginEmail(input: string) {
          await this.enter(loginpagelocator.LoginEmail, input);

     }

     async enterLoginPassword(pass: string) {
          await this.enter(loginpagelocator.LoginPassword, pass);
     }

     async clickLogin() {
           const button = this.getLocator(loginpagelocator.LoginButton);

          // wait until visible & enabled
          await button.waitFor({ state: "visible" });
          await this.page.waitForTimeout(500);   // allow JS validation to finish

          if (await button.isEnabled()) {
               await button.click();
          } else {
               throw new Error("Register button is still disabled");
          } 

         //await this.page.locator("input[name='register']").click();
     }







}
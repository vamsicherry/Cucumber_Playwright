import { ICreateAttachment } from '@cucumber/cucumber/lib/runtime/attachment_manager';
import { Page } from 'playwright';


export default class BasePage {

      protected page: Page;
      protected log:ICreateAttachment;
      constructor(page: Page,log:ICreateAttachment) {

            this.page = page;
            this.log=log;


      }

      getLocator(object: any) {
            return this.page.locator(object["locator"], object["locatorOptions"]);

      }


      async enter(object: any, data: string) {
            await this.getLocator(object).fill(data, object["extraOptions"]);
             this.log(` user enter  value ${data} on ${object["description"]}`);
      }

       async click(object: any) {
            console.log("Clicking locator:", object["locator"]);
            await this.getLocator(object).click(object["extraOptions"]);
            this.log(` user clicked on ${object["description"]}`);
      } 
     
}

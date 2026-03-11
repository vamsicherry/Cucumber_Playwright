import BasePage from "./basepage";
import * as billingdetailslocator from '../locators/billingdetails.json';
import { Page } from "playwright";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class BillingDetails extends BasePage {


      constructor(page: Page,log: ICreateAttachment) {
            super(page,log);
      }

      async enterFirstandLastName(first: string, last: string) {
            await this.enter(billingdetailslocator.FirstName, first);
            await this.enter(billingdetailslocator.LastName, last);

      }

      async enterPhoneNumberAndAddress(number: string, add: string) {
            await this.enter(billingdetailslocator.PhoneNumber, number);
            await this.enter(billingdetailslocator.Address, add);

      }

      async enterCityAndZipCode(city: string, zip: string) {
            await this.enter(billingdetailslocator.BillingCity, city);
            await this.enter(billingdetailslocator.BillingPostCode, zip);
      }


      async selectState(stateName: string) {
            await this.click(billingdetailslocator.BillingState1);

            await this.page.waitForSelector('.select2-results li');
            await this.page.click(`.select2-results li:has-text("${stateName}")`);
      }

      async selectPaymentMode() {
            await this.click(billingdetailslocator.PaymentCOD);
      }

      async clickPlaceOrder() {
            await this.click(billingdetailslocator.PlaceOrder);
      }

      async finalReceipt() {
            const finalreceipt = this.getLocator(billingdetailslocator.FinalReceipt);

            // Wait until the receipt list is visible
            await finalreceipt.first().waitFor({ state: 'visible', timeout: 10000 });

            // Collect all texts
            const texts = await finalreceipt.allTextContents();


            for (const data of texts) {
                  console.log(data?.trim());
            }

            const orderline = texts.find(t => t.includes('Order Number:'));

            const orderNumber = orderline?.replace('Order Number:', '').trim();

            console.log(` ordernumber is ${orderNumber}`)
            return orderNumber;


      }

}
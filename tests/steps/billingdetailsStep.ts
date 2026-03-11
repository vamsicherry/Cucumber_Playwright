

import { Given, When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../helper/types/custom';
import { RandomDataUtil } from '../utils/RandomUtils';


When('user enter billing details', async function (this: CustomWorld) {
      const first_name = RandomDataUtil.getFirstName();
      const last_name = RandomDataUtil.getlastName();
      const phone_number = RandomDataUtil.getRandomNumeric(10);
      const address = RandomDataUtil.getRandomAddress();
      const city = RandomDataUtil.getRandomCity();
      const zip_code = RandomDataUtil.getRandomPin();

      console.log(` firstname ${first_name}and secondName ${last_name}`);
      await this.billingDetails.enterFirstandLastName(first_name, last_name);


      await this.billingDetails.enterPhoneNumberAndAddress(phone_number, address);

      await this.billingDetails.enterCityAndZipCode(city, zip_code);

      await this.billingDetails.selectState("Jammu and Kashmir");

      await this.billingDetails.selectPaymentMode();
      await this.billingDetails.clickPlaceOrder();
      const orderNumber = await this.billingDetails.finalReceipt();
      this.ordernumber = orderNumber;

})

Then('user verify the order details', async function (this: CustomWorld) {
      await this.myAccount.clickMyAccount();
      await this.myAccount.clickOrderPage();
      await this.myAccount.ViewOrderDetails(this.ordernumber!);
      const finalsummary = await this.myAccount.FinalDetailProcessing();
      console.log(`==========>Final Summary: ${finalsummary}<=============`);

})
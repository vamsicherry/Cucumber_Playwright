import {Given,When,Then}  from '@cucumber/cucumber';
import { CustomWorld } from '../helper/types/custom';



Given('user clicked on logout', async function (this:CustomWorld) {
      await this.myAccount.clickSignOut();
      this.attach(`user clicked on logout`)
});
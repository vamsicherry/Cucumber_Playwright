

import {Given,When,Then} from '@cucumber/cucumber';
import { CustomWorld } from '../helper/types/custom';







Given('user clicks product to cart',async function (this:CustomWorld) {
      await this.addToCart.clickOnShop();
      await this.addToCart.clickHtmlBookLink();
      await this.addToCart.SelectBook(process.env.BookName!);
      await this.addToCart.clickBookToCart();
      await this.addToCart.CheckProdCount();
      await this.addToCart.clicktoProceed();
      await this.addToCart.getPriceOfProduct();
      await this.addToCart.proceedToCheckOut();
      await this.addToCart.isBillingPageVisible();
      
})
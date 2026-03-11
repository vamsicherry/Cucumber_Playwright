import BasePage from "./basepage";
import * as myaccountlocators from '../locators/myaccount.json';
import { Page } from "playwright";
import { ro } from "@faker-js/faker/.";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";

export default class MyAccount extends BasePage{


    constructor(page:Page,log: ICreateAttachment)
    {
         super(page,log);
    }

    async clickSignOut()
    {
            const signoutbtn= this.getLocator(myaccountlocators.LogoutPage);

            await signoutbtn.waitFor({state:"visible"});

            if(await signoutbtn.isEnabled()){
                 await signoutbtn.click();
            }else{
                  throw new Error("signout button is still disabled");
            }
         
    }

    async clickMyAccount()
    {
           await this.click(myaccountlocators.MyAccountPage);
    }

    async clickOrderPage()
    {
           await this.click(myaccountlocators.OrdersPage);
    }

    async ViewOrderDetails(ordernumber:string)
    {
            const row= this.page.locator(`div.woocommerce-MyAccount-content tbody tr:has-text("${ordernumber}")`);
            console.log(`row data ${row}`);
            const viewbutton=row.locator('td').last().locator('a,button');
            await viewbutton.waitFor({state:'visible',timeout:1000});
        
            await viewbutton.click();
    }


    async FinalDetailProcessing()
    {
          const summary= this.getLocator(myaccountlocators.OrderDetailsText);
          await summary.waitFor({state:'visible',timeout:1000});
          const suma= await  summary.allInnerTexts();

          console.log(suma.join(" | "));

          return suma.join(" | ");

          
          
    }

    


}
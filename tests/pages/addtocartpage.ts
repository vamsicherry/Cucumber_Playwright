import { Page } from "@playwright/test";
import BasePage from "./basepage";
import * as addtocartlocator from '../locators/addtocart.json';
import { expect } from "@playwright/test";
import { ICreateAttachment } from "@cucumber/cucumber/lib/runtime/attachment_manager";


export class AddToCart extends BasePage
{
       constructor(page:Page,log:ICreateAttachment)
        {
            super(page,log);
        }


        async clickOnShop()
        {
             await this.click(addtocartlocator.ShopCart);
             this.log('User clicked on shop page')
        }

        async clickHtmlBookLink()
        {
             await this.click(addtocartlocator.HtmlBookPage);

        }

        async SelectBook(value:string)
        {
            const books=  this.getLocator(addtocartlocator.AllBookLinksHtml);
        
            const bookcount=await books.count();

            console.log(`book count is ${bookcount}`);


            for(let i=0;i<bookcount;i++)
            {
               const book= books.nth(i);
               const text=await book.textContent();


               if(text?.includes(value))
               {
                    
                    await  book.click();
                    console.log(`book found and name is ${text}`);
                    break;
               }

 
            }
            
            
        }
       async clickBookToCart(){
            await this.click(addtocartlocator.AddToBasket);

       }

       async CheckProdCount(){
             const bookc=  this.getLocator(addtocartlocator.CartCount);
             const bookcounts=await bookc.textContent();
             expect(parseInt(bookcounts!)).toBeGreaterThanOrEqual(1);
             console.log(`book count is ${bookc}`);
       }

       async clicktoProceed()
       {
           await this.click(addtocartlocator.ProceedToCart);
       }

       async getPriceOfProduct()
       {
           const priceprod=await this.getLocator(addtocartlocator.PriceOfProduct).textContent();
           console.log(`price of product is ${priceprod}`);
          
       }
       async proceedToCheckOut()
       {
               await this.click(addtocartlocator.ProceedToCheckOut);
       }
       async isBillingPageVisible()
       {
             const billpage=  this.getLocator(addtocartlocator.billingPage);
             await expect(billpage).toBeVisible();
       }
}
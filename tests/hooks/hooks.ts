import {Browser,BrowserContext,Page,chromium,firefox,webkit} from 'playwright';

import {BeforeAll,AfterAll,Before,After,BeforeStep,AfterStep,Status,setDefaultTimeout} from '@cucumber/cucumber';
import dotenv from 'dotenv';

import RegisterPage from '../pages/registerpage';
import fs from 'fs';
import LoginPage from '../pages/loginpage';
import MyAccount from '../pages/myaccoutpage';
import { AddToCart } from '../pages/addtocartpage';
import BillingDetails from '../pages/billingdetailspage';
import path from 'path';



let page:Page;
let browser:Browser;
let context:BrowserContext
let registerPage:RegisterPage;

setDefaultTimeout(60*1000*2)
BeforeAll(async function(){
       
      const filename=process.env.ENV || 'default'
      // load environment file like `.env.prod`, `.env.staging`, `.env.qa`, or `.env.default`
      dotenv.config({
            path:`tests/helper/env/.env.${filename}`
      })

      const browserType=process.env.BROWSER;
      switch (browserType) {
        case "chrome":
               browser=  await chromium.launch({headless:false,args:['--start-maximized']});
                 break;
        case "firefox":
                browser= await firefox.launch({headless:false});
                 break;
        case  "webkit":
                browser=await webkit.launch({headless:false});
                break;
        default:
            throw new Error(`no browser found ${browserType}`);
      }

})

Before(async function (scenario) {
             
    let options:any ={
         javaScriptEnabled:true
         
    }
  /*  if(scenario.pickle.tags.some(t=>t.name==='@sandy'))
   {
          options.storageState='tests/helper/auth/sandy.json';
   } */
   options.recordVideo={dir:'testResults/video/'};
   context=await browser.newContext(options);
   page = await context.newPage();

    this.registerPage = new RegisterPage(page,this.attach);
    this.loginPage= new LoginPage(page,this.attach);
    this.myAccount = new MyAccount(page,this.attach);
    this.addToCart = new AddToCart(page,this.attach);
    this.billingDetails= new BillingDetails(page,this.attach);
    // registerPage = new RegisterPage(page);

    await context.tracing.start({screenshots:true,snapshots:true,sources:true})


    await page.goto(process.env.BASE_URL!);

    this.attach(`..............${scenario.pickle.name} is started.......`)
    
      
})
After(async function (scenario) {

  const timestamp = new Date().toISOString().replace(/[:.]/g,'-');

  if(scenario.result?.status === Status.FAILED){

     const tracepath=`testResults/traces/${scenario.pickle.name}-${timestamp}.zip`;

     await context.tracing.stop({path:tracepath});

     const traceBuffer=await fs.promises.readFile(tracepath);
     this.attach(traceBuffer,'application/zip');

     const img=await page.screenshot({
        path:`testResults/screenshots/${scenario.pickle.name}-${timestamp}.png`,
        fullPage:true
     });

     this.attach(img,"image/png");

     //video
     const video = page.video();
    if (video) {
      const videopath = await video.path();
      const videoBuffer = await fs.promises.readFile(videopath);
      this.attach(videoBuffer, 'video/webm');
    }

  }else{
     await context.tracing.stop();

     //want to delete video in local
     /* const vs=page.video();

     if(vs)
     {
        const vspath=await vs.path();
        try{
            await fs.promises.unlink(vspath);
        }catch(err)
        {
          console.warn(`Could not delete video: ${vspath}`, err);  
        }
     } */
  }

 await context.close();
  await page.close();

});

BeforeStep(async function(scenario){
        this.attach(`------------------${scenario.pickle.name} ------ is started`)
})


AfterStep(async function(scenario){
        this.attach(`------------------${scenario.pickle.name} ------ is ended`)
})
AfterAll(async function () {
  await browser.close();
});
export function getPage():Page{
       return page;
}
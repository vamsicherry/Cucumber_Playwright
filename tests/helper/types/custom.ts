import { World } from "@cucumber/cucumber";

import RegisterPage from "../../pages/registerpage";
import LoginPage from "../../pages/loginpage";
import { Page } from "@playwright/test";
import MyAccount from "../../pages/myaccoutpage";
import { AddToCart } from "../../pages/addtocartpage";
import BillingDetails from "../../pages/billingdetailspage";

export interface CustomWorld extends World{
     page:Page;
     registerPage: RegisterPage;
     loginPage:LoginPage;
     myAccount:MyAccount;
     addToCart:AddToCart;
     billingDetails:BillingDetails;
     email?:string;
     password?:string;
     ordernumber?:string
}
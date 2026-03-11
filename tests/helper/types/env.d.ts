

export declare global{
      namespace  NodeJS{

        interface ProcessEnv{
            BROWSER : "chrome" | "firefox"| "webkit",
            BASE_URL:string,
            ENV : "prod"| "staging"| "qa",
            USER_NAME:string,
            PASSWORD: string,
            BookName:string
        }

     }
}
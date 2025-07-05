import dotenv from "dotenv";

dotenv.config();

interface ConfigInterface{
    token:string|undefined
}

export const config:ConfigInterface = {
    token: process.env.token
}

import * as Joi from "joi";
import 'dotenv/config'
interface Vars {
    PORT: number,
    API_KEY_STRIPE: string
    NATS_SERVERS: string
    CANCEL_URL: string
    SUCCESS_URL: string
    SECRET_ENDPOINT_WEBHOOK_KEY:string
}


const {error, value} = Joi.object({
    PORT: Joi.number().required(),
    API_KEY_STRIPE: Joi.string().required(),
    NATS_SERVERS: Joi.string().required(),
    CANCEL_URL: Joi.string().required(),
    SUCCESS_URL: Joi.string().required(),
    SECRET_ENDPOINT_WEBHOOK_KEY:Joi.string().required(),
}).unknown(true).validate(process.env);


const vars: Vars = {
    PORT: value.PORT,
    API_KEY_STRIPE: value.API_KEY_STRIPE,
    NATS_SERVERS: value.NATS_SERVERS,
    CANCEL_URL: value.CANCEL_URL,
    SUCCESS_URL: value.SUCCESS_URL,
    SECRET_ENDPOINT_WEBHOOK_KEY:value.SECRET_ENDPOINT_WEBHOOK_KEY
}

export const envs = {
    port: vars.PORT,
    api_key_stripe: vars.API_KEY_STRIPE ,
    nats_servers: vars.NATS_SERVERS,
    cancel_url: vars.CANCEL_URL,
    success_url: vars.SUCCESS_URL,
    secret_endpoint_webhook_key:vars.SECRET_ENDPOINT_WEBHOOK_KEY
}
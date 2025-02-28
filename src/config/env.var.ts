
import * as Joi from "joi";
import 'dotenv/config'
interface Vars {
    PORT: number,
    API_KEY_STRIPE: string
}


const {error, value} = Joi.object({
    PORT: Joi.number().required(),
    API_KEY_STRIPE: Joi.string().required()
}).unknown(true).validate(process.env);


const vars: Vars = {
    PORT: value.PORT,
    API_KEY_STRIPE: value.API_KEY_STRIPE
}

export const envs = {
    port: vars.PORT,
    api_key_stripe: vars.API_KEY_STRIPE ,
}
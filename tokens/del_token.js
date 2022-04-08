import { Token } from "../models/token_model.js"

export const del_token = async (key) => {
    
    try {
        const token = await Token.findOne({ key });
        if (token) {
            await Token.findOneAndRemove({ key });
            return true;
        } else {
            return false;
        }
    } catch (e) {
        return false
    }
}
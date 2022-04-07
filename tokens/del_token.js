import { Token } from "../models/token_model.js"

export const del_token = async (key) => {
    
    try {
        await Token.deleteOne({key});
        return 1;
    } catch (e) {
        return 0
    }
}
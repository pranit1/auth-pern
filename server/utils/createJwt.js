import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config()

const createJwt = (user_id) => {
    const payload = {
        user: user_id
    }
    console.log(payload)
    return jwt.sign(payload, process.env.jwtSecret,{expiresIn:3600})
}

export default createJwt
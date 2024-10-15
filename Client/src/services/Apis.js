import { commanrequest } from "./ApiCall";
import { BACKEND_URL } from "./helper";

export const registerfunction = async (data) => {
    return await commanrequest("POST",`${BACKEND_URL}/user/register`, data);
};
export const sendOtpFunction =async (data)=>{
    return await commanrequest("POST",`${BACKEND_URL}/user/sendotp`,data);
}

export const userverify =async (data)=>{
    return await commanrequest("POST",`${BACKEND_URL}/user/verify`,data);
}
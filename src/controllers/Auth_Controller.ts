import SocialAuthInfos from "@/models/SocialAuthInfos_Schema";
import User from "@/models/Users_Schema";
import { TIKTOK_USER_DATA } from "@/types/TiktokUserData_Interface";
import { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { UserService } from "@/services/User_Service";
import bcrypt from "bcrypt";
import { TIKTOKURL } from "@/constant/SocialURL_Constant";


export const login = async (req: Request, res: Response) => {
    const csrfState = generateCsrfState();
    res.cookie('csrfState', csrfState, { maxAge: 60000 });
    const url = buildAuthorizeUrl(csrfState);
    res.redirect(url);
}

export const getAccessToken = async (req: Request, res: Response) => {
    const { code, state } = req.query;
    const csrfState = req.cookies.csrfState;

    if (state !== csrfState) {
        return res.status(403).send('CSRF token mismatch');
    }

    try {
        const tokenData = await fetchAccessToken(code as string);
        if (!tokenData.access_token) {
            return res.status(400).send('Error obtaining access token');
        }

        const userData = await fetchUserInfo(tokenData.access_token);
        await handleAddUserData(userData);

        res.redirect("/");
    } catch (error) {
        console.error('Error in getAccessToken:', error);
        res.status(500).send('Internal Server Error');
    }
}

const generateCsrfState = () => Math.random().toString(36).substring(2);

const buildAuthorizeUrl = (csrfState: string) => {
    const clientKey = String(process.env.TIKTOK_CLIENT_KEY_LOCAL);
    const redirectUri = encodeURIComponent(String(process.env.TIKTOK_REDIRECT_URI));
    const codeVerifier = String(process.env.TIKTOK_CODE_VERIFIER);

    return `${TIKTOKURL.TIKTOK_AUTHORIZE_URL}?client_key=${clientKey}&scope=user.info.basic,user.info.profile&response_type=code&redirect_uri=${redirectUri}&state=${csrfState}&code_challenge=${codeVerifier}&code_challenge_method=S256`;
}

const fetchAccessToken = async (code: string) => {
    const tokenParams = new URLSearchParams({
        client_key: String(process.env.TIKTOK_CLIENT_KEY_LOCAL),
        client_secret: String(process.env.TIKTOK_CLIENT_SECRET_LOCAL),
        code,
        grant_type: 'authorization_code',
        redirect_uri: String(process.env.TIKTOK_REDIRECT_URI),
        code_verifier: String(process.env.TIKTOK_CODE_VERIFIER)
    });

    const response = await fetch(TIKTOKURL.TIKTOK_TOKEN_URL, {
        method: 'POST',
        body: tokenParams,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    if (!response.ok) {
        const responseText = await response.text();
        console.error('Error response from TikTok:', responseText);
        throw new Error(responseText);
    }

    return await response.json();
}

const fetchUserInfo = async (accessToken: string) => {
    const response = await fetch(TIKTOKURL.TIKTOK_USER_INFO_URL, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${accessToken}`
        }
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch user info: ${response.statusText}`);
    }

    const responseData = await response.json();
    return responseData.data.user;
}


const handleAddUserData = async (userData: TIKTOK_USER_DATA) => {
    const foundUser = await UserService.findUserBySocialAuthInfo('tiktokId', userData.union_id);
    if (!foundUser) {
        await storageTiktokUser(userData);
    }
}

const storageTiktokUser = async (userData: TIKTOK_USER_DATA) => {
    await User.insertMany({
        _id: new ObjectId(),
        username: userData.username,
        password: bcrypt.hashSync(process.env.SOCIAL_PASSWORD as string, 10),
        full_name: userData.display_name,
        phone_number: "000000000",
        email: "user@mail.org",
        gender: "Female",
        dBo: "1977-07-10T01:37:30.719Z",
        social_auth_infos: {
            tiktokId: userData.union_id
        },
        is_verify: false,
    });
}

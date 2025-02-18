import express, { Request, Response, NextFunction } from 'express';
import session from 'express-session';
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { ObjectId } from 'mongodb';
import User from '@/models/Users_Schema';
import bcrypt from "bcrypt";
import { GOOGLE_AUTH } from '@/constant/Google_Auth_Constant';
import path from 'path';

class GoogleAuthService {
    private GOOGLE_CLIENT_ID: string;
    private GOOGLE_CLIENT_SECRET: string;

    constructor() {
        this.GOOGLE_CLIENT_ID = String(process.env.GOOGLE_CLIENT_ID);
        this.GOOGLE_CLIENT_SECRET = String(process.env.GOOGLE_CLIENT_SECRET);
        this.initializePassport();
    }

    private initializePassport() {
        passport.use(new GoogleStrategy({
            clientID: this.GOOGLE_CLIENT_ID,
            clientSecret: this.GOOGLE_CLIENT_SECRET,
            callbackURL: GOOGLE_AUTH.GOOGLE_URL,
            passReqToCallback: true,
        }, this.authUser));

        passport.serializeUser((user, done) => {
            // console.log("serializeUser",user);
            done(null, user);
        });

        passport.deserializeUser((user: any, done) => {
            // console.log("deserializeUser", user);
            done(null, user);
        });
    }

    private async authUser(request: any, accessToken: any, refreshToken: any, profile: any, done: (arg0: any, arg1: any) => any) {
        console.log("authUser", profile);
        const { id, displayName,emails } = profile;
        const email = emails[0].value;
        const username = email.substring(0, email.indexOf("@"));;
        const password = bcrypt.hashSync(username, 10);
        try {
            let user = await User.findOne({ 'social_auth_infos.googleId': id });
    
            if (!user) {
                user = new User({
                    _id: new ObjectId(),
                    social_auth_infos: {googleId: id},
                    username: username,
                    password: password,
                    full_name: displayName,
                    email: email,
                    gender: 'male',
                    phone_number: 123,
                    dBo: '1900-02-02'

                });
                await user.save();
                console.log("User saved:", user);
            }
            
            return done(null, user);
        } catch (err) {
            return done(err, false);
        }
        // return done(null, profile);
    }

    public initializeMiddleware(app: express.Application) {
        app.use(session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        }));

        app.use(passport.initialize());
        // app.use(passport.session());
    }

    
    private checkAuthenticated(req: Request, res: Response, next: NextFunction) {
        if (req.isAuthenticated()) {
            return next();
        }
        res.redirect('/login');
    }
}

export default GoogleAuthService;
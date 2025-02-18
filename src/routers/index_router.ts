import express from "express";
import AddressRouter from "./Address_Router";
import CartRouter from "./Cart_Router";
import UserRouter from "./User_Router";
import GoogleAuthRouter from "@/routers/Google_Auth_Router";
import ShopRouter from "@/routers/Shops_Routes";
import ProductRouter from "@/routers/Product_Router"
import CategoryRouter from "@/routers/Category_Router"
import Review_Router from "@/routers/Review_Router";

export const routes = (app: express.Router) => {
	app.use("/api/user", UserRouter);
	app.use("/api/address", AddressRouter);
	app.use("/api/cart", CartRouter);
	app.use("/auth/google", GoogleAuthRouter);
	app.use("/shop", ShopRouter);
	app.use("/api/product", ProductRouter)
	app.use("/api/category", CategoryRouter)
	app.use("/comment", Review_Router);
};

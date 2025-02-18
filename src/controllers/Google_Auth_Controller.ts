import { Request, Response } from "express";


const GoogleAuthController = {
	CallBack: async (req: Request, res: Response) => {
		return res.send("success");
	},
};

export { GoogleAuthController };

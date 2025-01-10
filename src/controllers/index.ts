import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { createUrlReq } from "../model/request";
import services from "../services";
import { urlInfoRes } from "../model/response";

interface IControllers {
	createUrl: (req: Request, res: Response, next: NextFunction) => Promise<void>;
	redirectUrl: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	getUrlInfo: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<void>;
	deleteUrl: (req: Request, res: Response, next: NextFunction) => Promise<void>;
}

const InitController = (): IControllers => {
	return {
		createUrl,
		redirectUrl,
		getUrlInfo,
		deleteUrl,
	};
};

const createUrl = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const reqData: createUrlReq = { ...req.body };
	const url = await services.shortenUrl(reqData);

	res.status(201).json(url);
};

const redirectUrl = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const url = req.params.shortUrl;
    
    const originalUrl = await services.redirectUrl(url)

    res.redirect(originalUrl);
};

const getUrlInfo = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
    const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

    const url = req.params.shortUrl;

    const urlInfo: urlInfoRes = await services.getUrlInfo(url)

	res.status(200).json(urlInfo);
};

const deleteUrl = async (req: Request, res: Response, next: NextFunction) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) throw { status: 400, message: "invalid input" };

	const url = req.params.shortUrl;
    await services.deleteUrl(url)

	res.status(200).json({ msg: "Deleted successfully" });
};

export default InitController();

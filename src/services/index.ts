import { createUrlReq } from "../model/request";
import { shortenUrlRes, urlInfoRes } from "../model/response";
import crypto from "crypto";

const urlDatabase: Record<string, urlInfoRes> = {};

export function generateUniqueHash(): string {
	let hash;

	do {
		hash = crypto.randomBytes(3).toString("hex");
	} while (urlDatabase[hash]);

	return hash;
}

interface IServices {
	shortenUrl: (req: createUrlReq) => Promise<shortenUrlRes>;
	redirectUrl: (url: string) => Promise<string>;
	getUrlInfo: (url: string) => urlInfoRes;
	deleteUrl: (url: string) => void;
}

const InitServices = (): IServices => {
	return {
		shortenUrl,
        redirectUrl,
        getUrlInfo,
        deleteUrl,
	};
};

const shortenUrl = async (req: createUrlReq): Promise<shortenUrlRes> => {
	if (!req.originalUrl) throw { status: 500, message: "No url given" };

	const shortUrl = generateUniqueHash();

	urlDatabase[shortUrl] = {
        originalUrl: req.originalUrl,
        createdAt: Date.now(),
        clickCount: 1,
    };

	return { url: shortUrl };
};

const redirectUrl = async (url:string) => {
    if (!url) throw { status: 500, message: "No url given" };

    if (!urlDatabase[url] || urlDatabase[url] === undefined) throw { status: 404, message: "Url does not exist" };
    
    urlDatabase[url].clickCount += 1
    const { originalUrl } = urlDatabase[url]

    return "https://" + originalUrl
};

const getUrlInfo = (url: string): urlInfoRes => {
	if (!url) throw { status: 500, message: "No url given" };

    if (!urlDatabase[url] || urlDatabase[url] === undefined) throw { status: 404, message: "Url does not exist" };

    return urlDatabase[url]
};

const deleteUrl = (url: string) => {
	if (!url) throw { status: 500, message: "No url given" };

    if (!urlDatabase[url] || urlDatabase[url] === undefined) throw { status: 404, message: "Url does not exist" };

	delete urlDatabase[url];
};

export default InitServices();

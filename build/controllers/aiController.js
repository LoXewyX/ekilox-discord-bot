"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateImage = void 0;
const config_1 = __importDefault(require("../config"));
const openai_1 = require("openai");
const configuration = new openai_1.Configuration({
    apiKey: config_1.default.openai.OPENAI_API_KEY,
});
const openai = new openai_1.OpenAIApi(configuration);
const generateImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { prompt, size } = req.body;
    const imageSize = size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";
    try {
        const response = yield openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });
        const url = response.data.data[0].url;
        res.status(200).json({
            success: true,
            data: url,
        });
    }
    catch (error) {
        const errorWithResponse = error;
        res.status(400).json({
            success: false,
            error: (_a = errorWithResponse.response.data['error']) !== null && _a !== void 0 ? _a : "Unknown error occurred",
        });
    }
});
exports.generateImage = generateImage;

import { Request, Response } from "express";
import config from "../config";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: config.openai.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req: Request, res: Response) => {
  const { prompt, size } = req.body;

  const imageSize =
    size === "small" ? "256x256" : size === "medium" ? "512x512" : "1024x1024";

  try {
    const response = await openai.createImage({
      prompt,
      n: 1,
      size: imageSize,
    });

    const url = response.data.data[0].url;

    res.status(200).json({
      success: true,
      data: url,
    });
  } catch (error) {
    const errorWithResponse = error as {
      response?: { status: number; data: any };
      message?: string;
    };

    res.status(400).json({
      success: false,
      error: errorWithResponse.response!.data['error'] ?? "Unknown error occurred",
    });
  }
};

export { generateImage };

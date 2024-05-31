import * as fs from "fs";
import OpenAI from "openai";

interface Options {
  prompt?: string;
  audioFile: Express.Multer.File;
}

export const audioToTextUseCase = async(openai:OpenAI, opttions: Options) => {
  const { prompt, audioFile } = opttions;

  const response = await openai.audio.transcriptions.create({
    model:'whisper-1',
    file: fs.createReadStream(audioFile.path),
    prompt: prompt, //mismo idioma que el audio
    language: 'es', //ISO 639-1 code
    response_format: 'verbose_json', //"verbose_json" | "json" | "text" | "srt" | "vtt"
  })

  return response;
}
import * as path from 'path';
import * as fs from 'fs';

import { Injectable, NotFoundException } from '@nestjs/common';
import {
  TextToAudioUseCase,
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  ortographyCheckUseCase,
  prosConsDiscuserStreamUseCase,
  prosConsDiscuserUseCase,
  translateUseCase,
} from './use-cases';
import { AudioToTextDto, ImageGenerationDto, ImageVariationDto, OrtographyDto, ProsConsDiscusserDto, TextToAudioDto, TranslateDto } from './dtos';
import OpenAI from 'openai';

@Injectable()
export class GptService {
  private openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  //Solo va a llamar casos de uso

  //Ortography Check
  async ortographyCheck(ortographyDto: OrtographyDto) {
    return await ortographyCheckUseCase(this.openai, {
      prompt: ortographyDto.prompt,
    });
  }

  async prosConsDiscuser({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscuserUseCase(this.openai, { prompt });
  }

  async prosConsDiscuserStream({ prompt }: ProsConsDiscusserDto) {
    return await prosConsDiscuserStreamUseCase(this.openai, { prompt });
  }
  
  async translateText({ prompt, lang }: TranslateDto) {
    return await translateUseCase(this.openai, { prompt, lang });
  }

  async textToAudio({ prompt, voice }: TextToAudioDto) {
    return await TextToAudioUseCase(this.openai, { prompt, voice });
  }

  async textToAudioGetter(fileId:string){
    const filePath = path.resolve(__dirname, `../../generated/audios/`,`${fileId}`);
    const wasFound = fs.existsSync(filePath);

    if(!wasFound) throw new NotFoundException(`File ${fileId} not found`);

    return filePath;
  }

  async audioToText(audioFile: Express.Multer.File, audioToTextDto: AudioToTextDto) {
    const { prompt } = audioToTextDto;
    return await audioToTextUseCase(this.openai, { audioFile,prompt });
  }

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, imageGenerationDto);
  }

  getGeneratedImage(fileName:string){
    const filePath = path.resolve('./','./generated/images/',fileName);
    const exist = fs.existsSync(filePath);

    if(!exist) throw new NotFoundException(`File ${fileName} not found`);

    return filePath;
  }

  async imageVariation(imageVariationDto: ImageVariationDto) {
    return await imageVariationUseCase(this.openai, imageVariationDto);
  }
}
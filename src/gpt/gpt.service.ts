import { Injectable } from '@nestjs/common';
import { ortographyCheckUseCase, prosConsDiscuserStreamUseCase, prosConsDiscuserUseCase } from './use-cases';
import { OrtographyDto, ProsConsDiscusserDto } from './dtos';
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
}

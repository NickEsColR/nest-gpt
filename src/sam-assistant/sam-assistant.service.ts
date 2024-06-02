import { Injectable } from '@nestjs/common';
import { create } from 'domain';
import OpenAI from 'openai';
import { checkCompleteStatusUseCase, createMessageUseCase, createRunUseCase, createThreadUseCase, getMessageListUseCase } from './use-cases';
import { QuestionDto } from './dtos/question.dto';

@Injectable()
export class SamAssistantService {

  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  })

  async createThread() {
    return await createThreadUseCase(this.openai);
  }

  async userQuestion( questionDto:QuestionDto) {
    const message = await createMessageUseCase(this.openai, {
      threadId: questionDto.threadId,
      question: questionDto.question
    });

    const run = await createRunUseCase(this.openai, {
      threadId: questionDto.threadId
    });

    await checkCompleteStatusUseCase(this.openai, {
      threadId: questionDto.threadId,
      runId: run.id
    });

    const messages = await getMessageListUseCase(this.openai, {
      threadId: questionDto.threadId
    })

    return messages;
  }
}

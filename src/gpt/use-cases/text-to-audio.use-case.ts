import * as path from 'path';
import * as fs from 'fs';
import OpenAI from 'openai';

interface Options {
  prompt: string;
  voice?: string;
}

export const TextToAudioUseCase = async (openai:OpenAI, { prompt, voice }:Options) => {

  const voices = {
    'nova':'nova',
    'alloy':'alloy',
    'echo':'echo',
    'fable':'fable',
    'onyx':'onyx',
    'shimmer':'shimmer'    
  }

  const voiceSelected = voices[voice] || 'nova';

  const folderPath = path.resolve(__dirname,'../../../generated/audios/');
  const speechFile = path.resolve(`${folderPath}/${new Date().getTime()}.mp3`);

  fs.mkdirSync(folderPath, { recursive: true });

  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: voiceSelected,
    input:prompt,
    response_format: 'mp3'
  });

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(speechFile, buffer)

  return speechFile;
}
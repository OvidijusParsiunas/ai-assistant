import {OpenAIInternal, OpenAIInternalBody} from '../../../types/openAIInternal';
import {OpenAI} from '../../../types/openAI';

export class OpenAIBaseBodyAssembler {
  private static DEFAULT_PARAMS: OpenAIInternal = {
    chat: {
      model: 'gpt-3.5-turbo',
      startMessages: [{role: 'system', content: 'You are a helpful assistant.'}],
    },
    completions: {
      model: 'text-curie-001',
    },
  };

  public static assemble(openAI?: OpenAI): OpenAIInternalBody {
    const openAIInternal: OpenAI = JSON.parse(JSON.stringify(openAI || OpenAIBaseBodyAssembler.DEFAULT_PARAMS));
    if (openAIInternal?.chat) {
      if (typeof openAIInternal.chat === 'boolean') return OpenAIBaseBodyAssembler.DEFAULT_PARAMS.chat;
      const baseBody = Object.assign(OpenAIBaseBodyAssembler.DEFAULT_PARAMS.chat, openAIInternal.chat);
      baseBody.startMessages = baseBody.messages || baseBody.startMessages;
      return baseBody;
    }
    if (typeof openAIInternal.completions === 'boolean') return OpenAIBaseBodyAssembler.DEFAULT_PARAMS.completions;
    return Object.assign(OpenAIBaseBodyAssembler.DEFAULT_PARAMS.completions, openAIInternal.completions);
  }
}

import { Configuration, OpenAIApi } from 'openai'

export default class OpenAIClient {
  url: string
  static instance: OpenAIClient
  static client: OpenAIApi

  constructor(config: string) {
    this.url = 'https://api.openai.com/v1'
  }

  static getInstance(config: string): OpenAIClient {
    if (!this.instance) {
      this.instance = new OpenAIClient(config)
      const configuration = new Configuration({
        apiKey: config
      })
      this.client = new OpenAIApi(configuration)
    }
    return this.instance
  }

  async getCompletion(prompt: string): Promise<unknown> {
    const response = await this.makeRequest('chat', prompt)
    return response
  }

  async makeRequest (command: string, prompt: string): Promise<unknown> {
    if (!OpenAIClient.instance) return
    console.log('command', command)
    console.log('prompt', prompt)
    if (command === 'chat') {
      const completion = await OpenAIClient.client.createChatCompletion({
        model: 'gpt-3.5-turbo',
        temperature: 0.1,
        messages: [{ role: 'user', content: prompt }]
      })
      return completion.data.choices[0].message
    }
  }
}

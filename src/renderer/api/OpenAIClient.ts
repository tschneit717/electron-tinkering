export default class OpenAIClient {
  url: string
  apiKey: string
  static instance: OpenAIClient | null

  constructor(config: string) {
    this.url = 'https://api.openai.com/v1/engines/davinci/completions'
    this.apiKey = `Bearer  ${config ?? ''}`
  }

  static async getInstance(config: string): Promise<void> {
    if (!this.instance) {
      this.instance = new OpenAIClient(config)
    }
  }

  async getCompletion(prompt: string): Promise<unknown> {
    console.log(this.apiKey)
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.apiKey
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: ['\n', ' Human:', ' AI:']
      })
    }).then(async (res) => await res.json())
    console.log(response)
    return response
  }

  async makeRequst (path: string, prompt: string): Promise<unknown> {
    const response = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.apiKey
      },
      body: JSON.stringify({
        prompt,
        max_tokens: 100,
        temperature: 0.9,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.6,
        stop: ['\n', ' Human:', ' AI:']
      })
    }).then(async (res) => await res.json())
    console.log(response)
    return response
  }
}

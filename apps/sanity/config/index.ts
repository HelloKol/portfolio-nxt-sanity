interface AppConfig {
  projectId: string
  dataset: string
  token: string
}

class Config {
  private readonly defaults: AppConfig = {
    projectId: '',
    dataset: '',
    token: '',
  }

  private readonly envConfig: Partial<AppConfig>

  constructor() {
    // Load environment-specific values
    this.envConfig = {
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      dataset: process.env.SANITY_STUDIO_DATASET,
      token: process.env.SANITY_STUDIO_TOKEN,
    }
  }

  get(): AppConfig {
    return {...this.defaults, ...this.envConfig}
  }
}

export default new Config().get()

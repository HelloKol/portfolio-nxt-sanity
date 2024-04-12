interface AppConfig {
  projectId: string
  dataset: string
}

class Config {
  private readonly defaults: AppConfig = {
    projectId: '',
    dataset: '',
  }

  private readonly envConfig: Partial<AppConfig>

  constructor() {
    // Load environment-specific values
    this.envConfig = {
      projectId: process.env.SANITY_STUDIO_PROJECT_ID,
      dataset: process.env.SANITY_STUDIO_DATASET,
    }
  }

  get(): AppConfig {
    return {...this.defaults, ...this.envConfig}
  }
}

export default new Config().get()

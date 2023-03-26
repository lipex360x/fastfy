export class PipelineBuilder<InputType> {
  protected readonly steps: any[] = []
  protected request: any

  public input(request: InputType) {
    this.request = request
    return this
  }

  public step(handler: any) {
    this.steps.push(handler)
    return this
  }

  public async run(): Promise<any> {
    let input = { ...this.request }

    for (const step of this.steps) input = await step.handler(input)

    return input
  }
}

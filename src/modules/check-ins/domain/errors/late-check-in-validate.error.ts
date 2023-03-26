export class LateCheckInValidateError extends Error {
  constructor() {
    super('The check-in can only be validated util 20 minutes of creation')
  }
}

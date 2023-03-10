export class InvalidCredentialError extends Error {
  constructor() {
    super('E-mail is already exists')
  }
}

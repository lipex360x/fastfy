export class UserAlreadyExistsError extends Error {
  constructor() {
    super('User is already exists')
  }
}

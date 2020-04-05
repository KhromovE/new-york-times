export class CancelError extends Error {
  constructor() {
    super('Cancel error')

    Object.setPrototypeOf(this, CancelError.prototype)
  }
}

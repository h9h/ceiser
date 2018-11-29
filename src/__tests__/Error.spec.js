import { throwParseError } from '../Error'

describe('Error', () => {
  it('should throw', () => {
    const testThrow = () => throwParseError('message', { test: true })
    expect(testThrow).toThrow(Error)
    expect(testThrow).toThrow('message')
  })
})

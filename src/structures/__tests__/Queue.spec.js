import Queue from '../Queue'

describe('Queue', () => {
  it('empty Queue', function () {
    const q = new Queue()

    expect(q.length()).toBe(0)
    expect(q.dequeue()).not.toBeDefined()
  })

  it('should take items', function () {
    const q = new Queue()

    q.enqueue('1')
    q.enqueue('2')

    expect(q.length()).toBe(2)
  })

  it('should return items in Order', function () {
    const q = new Queue()

    q.enqueue('1')
    q.enqueue('2')

    expect(q.dequeue()).toBe('1')
    expect(q.dequeue()).toBe('2')

    expect(q.length()).toBe(0)

    expect(q.dequeue()).not.toBeDefined()
  })
})

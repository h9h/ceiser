import neode from '../neo4j'

describe('neo4j / Neode', () => {
  it('should get a single instance', function () {
    const a = neode.getInstance()
    const b = neode.getInstance()

    expect(a).toBe(b)
  })
})

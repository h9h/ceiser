import neode from '../neo4j'

describe('neo4j / Neode', () => {
  it('should get a single instance', function () {
    const a = neode.getInstance()
    const b = neode.getInstance()

    expect(a).toBe(b)
  })

  // it('should get some data', (done) => {
  //   const n = neode.getInstance()
  //   n.builder.match('c', 'ServiceNamespace').return('c').execute().then(res => {
  //     console.log(res.records)
  //     done()
  //   })
  // })
})

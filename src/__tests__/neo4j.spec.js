import neo4j from '../neo4j'

describe('neo4j / Seraph', () => {
  const neo = neo4j.getInstance()

  it('should get a single instance', function () {
    const a = neode.getInstance()
    const b = neode.getInstance()

    expect(a).toBe(b)
  })

  it('should create Node', function (done) {
    const Node = neo.model('User')
    Node.save({ fqn: 'voll.qualifizierter.name', eigenschaft: 'rot'}, (err, saved) => {
      Node.where({ fqn: 'voll.qualifizierter.name'}, (err, result) => {
        console.log(result)
        done()
      })
    })

  })
  // it('should get some data', (done) => {
  //   const n = neode.getInstance()
  //   n.builder.match('c', 'ServiceNamespace').return('c').execute().then(res => {
  //     console.log(res.records)
  //     done()
  //   })
  // })
})

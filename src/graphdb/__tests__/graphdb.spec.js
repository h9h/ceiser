import graphdb, { toObject } from '../graphdb'

describe('graphdb', () => {
  let db

  beforeEach(() => {
    db = graphdb.getInstance()
  })
  afterEach(() => {
    db.close()
  })

  const logAndDone = done => (args) => {
    console.log(args)
    done()
  }
  it('should get a single instance', function () {
    const a = graphdb.getInstance()
    const b = graphdb.getInstance()

    expect(a).toBe(b)
  })

  it('should run single cypher', function (done) {
    db.run(
      'CREATE (n:Item {name: {nameParam}}) RETURN n.name as name',
      { nameParam: 'First Item' },
      result => {
        expect(result.records.length).toBe(1)
        const rec = result.records[0]
        expect(rec.keys).toEqual(['name'])
        expect(rec._fields).toEqual(['First Item'])
        expect(rec._fieldLookup).toEqual({ name: 0 })
        expect(toObject(rec)).toEqual({ name: 'First Item'})
        done()
      },
      logAndDone(done),
    )
  })
  // it('should get some data', (done) => {
  //   const n = neode.getInstance()
  //   n.builder.match('c', 'ServiceNamespace').return('c').execute().then(res => {
  //     console.log(res.records)
  //     done()
  //   })
  // })
})

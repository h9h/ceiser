import graphdb from '../graphdb'

describe('graphdb', () => {
  let db

  beforeEach(() => {
    db = graphdb.getInstance()
  })
  afterEach(() => {
    db.close()
  })

  const logAndDone = done => (args) => {
    console.log(args) // eslint-disable-line no-console
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
        expect(rec.toObject()).toEqual({ name: 'First Item'})
        done()
      },
      logAndDone(done),
    )
  })

  it('should run transactions', async () => {
    const tx = db.transaction()

    const result = await tx.run(
      'CREATE (n:Transaction {name: {nameParam}}) RETURN n.name as name',
      {nameParam: 'First Transaction'}
    )

    expect(result.records.length).toBe(1)

    const rec = result.records[0]
    expect(rec.keys).toEqual(['name'])
    expect(rec._fields).toEqual(['First Transaction'])
    expect(rec._fieldLookup).toEqual({name: 0})
    expect(rec.toObject()).toEqual({name: 'First Transaction'})

    await tx.commit()
  })
})

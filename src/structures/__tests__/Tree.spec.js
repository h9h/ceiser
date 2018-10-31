import Tree from '../Tree'

describe('Tree', () => {
  it('should print tree', function () {
    const t = new Tree({ id: 'root'}, (n1, n2) => n1.id === n2.id)

    t.add({ id: 'child', name: 'Michael' }, { id: 'root' })

    expect(t.toString().split('\n').length).toBe(3)
  })

  it('complexer tree', function () {
    const t = new Tree('root', (n1, n2) => n1 === n2)

    t.add('firstChild', 'root')
    t.add('secondChild', 'root')
    t.add('c2', 'firstChild')
    t.add('d2', 'firstChild')
    t.add('e2', 'firstChild')
    t.add('a', 'firstChild')
    t.add('c2.2', 'secondChild')
    t.add('a', 'c2.2')
    t.add('b', 'c2.2')
    t.add('c', 'b')
    t.add('choose which a?', 'a')

    expect(t.toString().split('\n').length).toBe(13)
  })

  it('add tree to tree', function () {
    const s = new Tree('root', (n1, n2) => n1 === n2)
    s.add('one', 'root')
    s.add('two', 'root')

    const t = new Tree('root', (n1, n2) => n1 === n2)
    t.add('firstChild', 'root')
    t.add('secondChild', 'root')
    t.add('c2', 'firstChild')
    t.add('d2', 'firstChild')
    t.add('e2', 'firstChild')
    t.add('a', 'firstChild')
    t.add('c2.2', 'secondChild')
    t.add('a', 'c2.2')
    t.add('b', 'c2.2')
    t.add('c', 'b')
    t.add('choose which a?', 'a')

    s.addTree(t, 'two')

    expect(s.toString().split('\n').length).toBe(16)
  })

  it('remove node from tree (preserving children)', function () {
    const t = new Tree('root', (n1, n2) => n1 === n2)
    t.add('firstChild', 'root')
    t.add('secondChild', 'root')
    t.add('c2', 'firstChild')
    t.add('d2', 'firstChild')
    t.add('e2', 'd2')
    t.add('f3', 'e2')
    t.add('c2.2', 'secondChild')
    t.add('a', 'c2.2')
    console.log(t.toString()) // eslint-disable-line no-console
    expect(t.toString().split('\n').length).toBe(10)

    t.remove('e2')
    console.log(t.toString()) // eslint-disable-line no-console
    expect(t.toString().split('\n').length).toBe(9)

    t.remove('firstChild')
    console.log(t.toString()) // eslint-disable-line no-console
    expect(t.toString().split('\n').length).toBe(8)
  })

  it('remove node from tree (not preserving children)', function () {
    const t = new Tree('root', (n1, n2) => n1 === n2)
    t.add('firstChild', 'root')
    t.add('secondChild', 'root')
    t.add('c2', 'firstChild')
    t.add('d2', 'firstChild')
    t.add('e2', 'd2')
    t.add('f3', 'e2')
    t.add('c2.2', 'secondChild')
    t.add('a', 'c2.2')
    console.log(t.toString()) // eslint-disable-line no-console
    expect(t.toString().split('\n').length).toBe(10)

    t.remove('e2', false)
    console.log(t.toString()) // eslint-disable-line no-console
    expect(t.toString().split('\n').length).toBe(8)

    t.remove('firstChild', false)
    console.log(t.toString()) // eslint-disable-line no-console
    expect(t.toString().split('\n').length).toBe(5)
  })
})

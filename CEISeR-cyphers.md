# CEISeR Cyphers

## Allgemein

Alle Label und Relationships:
```
match n-[r]-() return distinct labels(n), type(r)
```

Nodes ohne Relations (Orphans):
```
match (n) where not (n)--() return n
```

Alle Nodes with einer spezifischen Property:
```
match (n) where exists(n.additionalProperties) return n
```

Nodes und Anzahl ihrer Relationen:
```
match (n)-[r]-() return n, count(r) as rel_count order by rel_count desc
```

## Service Contracts

ServiceContract und Status:
```
match (a)-[s:state]-()--(sc:ServiceContract) return a.name as Status, sc.name as Contract, sc.classifications as Mandant
```

```
match (sc:ServiceContract), (state:State { name: "Releasetestbereit" }), p=shortestPath((sc)-[*1..2]-(state)) return p
```

## KDM

KDF-Elemente
```
match (n) where n.namespace starts with "de.svi.kdf." return n
```

Verwendetes Element
```
match (e:XSDElement {name: "schadenIdentNummer"})-[:usedComps]-() return e 
```

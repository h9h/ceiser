# ceiser
Use CEISeR Data

## Logging

This package is using [`roarr`](https://www.npmjs.com/package/roarr) logger to log the program's state.

Export `ROARR_LOG=true` environment variable to enable log printing to stdout.

Use [`roarr-cli`](https://github.com/gajus/roarr-cli) program to pretty-print the logs.

## Statistic cyphers

### Number of nodes
```
      MATCH (n) RETURN count(n)
```
### Number of relations
```
      MATCH ()-->() RETURN count(*)
```

### Kind of nodes
```
      MATCH (n) RETURN DISTINCT labels(n), 
        count(*) AS SampleSize,
        avg(size(keys(n))) as Avg_PropertyCount,
        min(size(keys(n))) as Min_PropertyCount,
        max(size(keys(n))) as Max_PropertyCount,
        avg(size( (n)-[]-() ) ) as Avg_RelationshipCount,
        min(size( (n)-[]-() ) ) as Min_RelationshipCount,
        max(size( (n)-[]-() ) ) as Max_RelationshipCount
```

### Kind of relationships

```
      MATCH (n) 
      MATCH (n)-[r]->(m) WITH n, type(r) as via, m
      RETURN labels(n) as from,
      via,
      labels(m) as to,
      count(*) as freq
```

## Installation
APOC

Installiere APOC durch kopieren des Jars in das neo4j/plugin Verzeichnis.

Erlaube APOC Procedures durch folgende Teile in conf/neo4j.conf:

```
dbms.security.procedures.unrestricted=apoc.*
```

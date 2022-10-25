# Einlesen von CEISeR Daten in Neo4j

## Installation von neo4j

Eine lokale Installation von neo4j ist notwendig: entweder die Community Edition oder Neo4j Desktop.

Eine lokale Datenbank mit ist anzulegen und zu starten und ein Passwort für den Benutzer neo4j zu vergeben.

## .env

Eine .env Datei ist im Wurzelverzeichnis anzulegen mit folgenden Properties:

```
NEO4J_HOST=neo4j://localhost:7687
NEO4J_USERNAME=neo4j
NEO4J_PASSWORD=xxx
```

## data.zip

Kopiere die Datei data.zip aus dem CEISeR-Produktions-Workspace nach `<projekt>/data`.

Bei mir liegt die Datei hier: `C:\ws\xplor-ws-17.6\Production\models\ceiser\content\content`

## Installation

1. Installiere die Bibliotheken
      ```
      npm i
      ```
2. Baue das Projekt
      ```
      npm run build
      ```

## Lade die Informationen in die Graph-DB

```
node lib\main generate --file <Pfad zu data.zip> --todb
```

(z.B. `node lib\main generate --file C:\dev\ceiser\data\data.zip`)

```

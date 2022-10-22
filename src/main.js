/* eslint-disable no-console */
import util from 'util'
import commandLineArgs from 'command-line-args'
import commandLineUsage from 'command-line-usage'
import { generate as generateKuK } from './data-zip'
import { removeData } from './data-clear'

const fs = require('fs')

class FileDetails {
  constructor (filename) {
    this.filename = filename
    this.exists = fs.existsSync(filename)
  }
}

/* first - parse the main command */
const mainDefinitions = [
  { name: 'command', defaultOption: true }
]
const mainoptions = commandLineArgs(mainDefinitions, { stopAtFirstUnknown: true })
const argv = mainoptions._unknown || []

const command = mainoptions.command
console.log(command, argv)

function File(filename){
  return new FileDetails(filename)
}

const options = cmd => {
  switch (cmd) {
    case 'generate':
      return [
        { name: 'file', alias: 'f', type: File },
        { name: 'indices', alias: 'i', type: Boolean, defaultValue: false },
        { name: 'batchsize', alias: 'b', type: Number, defaultValue: 1000 },
        { name: 'todb', alias: 'd', type: Boolean, defaultValue: false },
      ]
    default:
      return []
  }
}

const commandHelp = cmd => {
  switch (cmd) {
    case 'help':
      return 'diese Hilfe'
    case 'prepare':
      return 'erzeugt die Indexe in der Datenbank'
    case 'generate':
      return 'erzeugt die Knoten und Kanten'
    case 'clear':
      return 'löscht alle Knoten und Kanten'
    default:
      return commandHelp('help')
  }
}

const commandOptionDefinitions = options(command)
const commandOptions = commandLineArgs(commandOptionDefinitions, { argv })

console.log(command, commandOptions)

const help = () => {
  const sections = [
    {
      header: 'SOA Graph',
      content: 'CEISeR Daten in Neo4j importieren'
    },
    {
      header: 'Commands',
      content: [
        { colA: 'prepare', colB: commandHelp('prepare') },
        { colA: 'generate', colB: commandHelp('generate') },
        { colA: 'clear', colB: commandHelp('clear') },
      ]
    },
    {
      header: 'Command "generate"',
      content: 'Liest die Daten aus dem gewählten Zip aus und generiert Nodes und Relations in Neo4j',
      optionList: options('generate')
    }
  ]
  const usage = commandLineUsage(sections)
  console.log(usage)
}

const prepare = () => {
  console.log('prepare t.b.d.')
}

const generate = (parameters) => {
  process.on('exit', () => console.log('Exiting process'))
  const done = (result) => {
    console.log('Finished. \n' + util.inspect(result, false, null))
    process.exit()
  }

  const filename = parameters.file.filename
  const includeIndices = parameters.indices
  const batchSize = parameters.batchsize
  const toFile = !parameters.todb

  generateKuK(done, toFile, { zipfile: filename, includeIndices, batchSize })
}

const clear = () => {
  removeData()
}

switch (command) {
  case 'help':
    help()
    break
  case 'prepare':
    prepare(commandOptions)
    break
  case 'generate':
    generate(commandOptions)
    break
  case 'clear':
    clear(commandOptions)
    break
  default:
    help()
}

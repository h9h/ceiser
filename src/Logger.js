import fs from 'fs'
import tracer from 'tracer'
import dotenv from 'dotenv'
dotenv.config()


const Logger = (() => {
  let instance

  const createInstance = () => {
    const traceLog = tracer.console({
      level: 'debug',
      inspectOpt: {
        depth : 10
      },
      transport : data => {
        fs.createWriteStream("./stream.log", {
          flags: "a",
          encoding: "utf8",
        }).write(data.rawoutput+"\n")
      }
    })

    const logLog = tracer.colorConsole({
      inspectOpt: {
        depth : 10
      }
    })

    tracer.setLevel(process.env.LOGLEVEL || 'info')

    return {
      setLevel: tracer.setLevel,
      trace: traceLog.trace,
      debug: traceLog.debug,
      info: logLog.info,
      warn: logLog.warn,
      error: logLog.error,
      fatal: logLog.fatal,
    }
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = createInstance()
      }
      return instance
    }
  }
})()

export default Logger.getInstance()

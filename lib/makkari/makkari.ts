import * as path from 'path'
import { Worker } from 'worker_threads'
import { IMakkariConfig, IMakkariConfigDatabase } from './interfaces/makkari.interface'
const WORKER_FILE = `worker${path.extname(__filename)}`

export class Makkari {
  private databaseConfig = {} as IMakkariConfigDatabase
  public queries: string[]
  constructor(private readonly makkariConfig: IMakkariConfig) {
    this.databaseConfig = makkariConfig.database
    this.queries = makkariConfig.queries || []
  }

  public async run() {
    const queriesBatches = this.chunkArray(this.queries, 1)
    const queryPromises = queriesBatches.map((queryBatch) => this.parallelizeQuery(queryBatch))
    const result = await Promise.all(queryPromises)

    return result
  }

  private chunkArray(arr: Array<any>, size: number): Array<any> {
    if (arr.length < size) return [arr]

    return [arr.slice(0, size), ...this.chunkArray(arr.slice(size), size)]
  }

  private async parallelizeQuery(queries: string[]) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(path.resolve(__dirname, WORKER_FILE), {
        workerData: { queries, databaseConfig: this.databaseConfig },
      })

      worker.on('message', resolve)
      worker.on('error', reject)
      worker.on('exit', (code) => {
        if (code !== 0) reject(new Error(`Worker stopped with exit code ${code}`))
      })
    })
  }
}

import { workerData, parentPort } from 'worker_threads'
import { IMakkariConfigDatabase } from './interfaces/makkari.interface'
import { Database } from '../databases/databases.module'

const queries = async () => {
  const { queries, databaseConfig }: { queries: string[]; databaseConfig: IMakkariConfigDatabase } = workerData
  const database = new Database(databaseConfig)
  const promises = queries.map((query) => database.sendQuery(query))
  const result = await Promise.all(promises)

  if (parentPort) parentPort.postMessage(JSON.stringify(result))
}

queries()

import { IPostgresConfigs } from './postgres.interfaces'
import { Client } from 'pg'

export class Postgres {
  private databaseClient = {} as Client
  constructor(private readonly postgresConfigs: IPostgresConfigs) {
    this.databaseClient = new Client({ ...postgresConfigs })
  }

  public async sendQuery(query: string) {
    this.databaseClient.connect()
    return this.databaseClient.query(query)
  }
}

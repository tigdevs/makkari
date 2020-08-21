import { Postgres } from './postgres/postgres.module'
import { IDatabaseConfigs, IDatabase } from './interfaces/databases.interface'
import { Databases } from '../makkari/interfaces/makkari.interface'

export class Database {
  private databaseType = '' as Databases
  private databaseInfo = {} as IDatabaseConfigs

  constructor(private readonly databaseConfig: IDatabase) {
    this.databaseType = databaseConfig.type
    this.databaseInfo = databaseConfig.config
  }

  public sendQuery(query: string) {
    if (this.databaseType === Databases.POSTGRES) {
      const postgres = new Postgres({ ...this.databaseInfo, min: 1, max: 10 })
      return postgres.sendQuery(query)
    }
  }
}

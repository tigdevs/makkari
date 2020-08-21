import { IDatabaseConfigs } from '../../databases/interfaces/databases.interface'

export interface IMakkariConfig {
  queries?: string[]
  database: IMakkariConfigDatabase
}

export interface IMakkariConfigDatabase {
  type: Databases
  config: IDatabaseConfigs
}

export enum Databases {
  POSTGRES = 'postgres',
}

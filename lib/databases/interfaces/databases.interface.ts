import { Databases } from '../../makkari/interfaces/makkari.interface'

export interface IDatabase {
  type: Databases
  config: IDatabaseConfigs
}

export interface IDatabaseConfigs {
  host: string
  port: number
  user: string
  password: string
  database: string
}

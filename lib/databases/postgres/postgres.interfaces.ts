import { IDatabaseConfigs } from '../interfaces/databases.interface'

export interface IPostgresConfigs extends IDatabaseConfigs {
  min: number
  max: number
}

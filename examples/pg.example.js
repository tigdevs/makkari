const { Pool } = require('pg')

const queries = Array(50).fill('select * from example, pg_sleep(5) limit 1')

const database = {
  database: 'tadpgweb',
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  min: 1,
  max: 10,
}

const pool = new Pool(database)

const main = async () => {
  console.time('QUERY')
  const client = await pool.connect()
  const promises = queries.map((query) => client.query(query))
  await Promise.all(promises)
  console.timeEnd('QUERY')
}

main()

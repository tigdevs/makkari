const { Makkari } = require('../dist/makkari/makkari')

const queries = Array(50).fill('select * from example, pg_sleep(5) limit 1')

const database = {
  type: 'postgres',
  config: {
    database: 'tadpgweb',
    host: 'localhost',
    port: 5432,
    user: 'postgres',
    password: 'postgres',
  },
}

const makkari = new Makkari({ queries, database })

const main = async () => {
  console.time('QUERY')
  console.log(await makkari.run())
  console.timeEnd('QUERY')
  process.exit(1)
}

main()

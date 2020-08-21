const { Makkari } = require('../dist/makkari/makkari')

describe('Makkari Tests', () => {
  let makkari = null
  const database = {
    type: 'postgres',
    config: {
      database: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      user: 'postgres',
      password: 'postgres',
    },
  }

  beforeEach(async () => {
    makkari = new Makkari({ database })
  })

  it('should be send 10 queries with pg_sleep of 2 seconds each in less than 5 seconds', async () => {
    makkari.queries = Array(10).fill('select * from example, pg_sleep(2) limit 1')
    const hrStart = process.hrtime()
    await makkari.run()
    const hrEnd = process.hrtime(hrStart)

    expect(hrEnd[0]).toBeLessThan(5)
  })
})

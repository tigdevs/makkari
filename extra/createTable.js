const { Client } = require('pg')

const pgclient = new Client({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'postgres',
  database: 'postgres',
})

pgclient.connect()

const table = `
CREATE TABLE example (num1 bigint, num2 double precision, num3 double precision);

INSERT INTO example (num1, num2, num3)

SELECT round(random()*10), random(), random()*142
FROM generate_series(1, 2000) s(i);

EXPLAIN (analyse, buffers) 
SELECT num1, avg(num3) as num3_avg, sum(num2) as num2_sum 
FROM example
GROUP BY num1; 
`

pgclient.query(table, (err, res) => {
  if (err) throw err
  pgclient.end()
})

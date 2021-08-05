import { Pool } from 'pg'

const signerOptions = {
  region: 'us-east-1',
  hostname: 'ec2-54-164-22-242.compute-1.amazonaws.com',
  port: 5432,
  username: 'ucwwjpwnexkkly',
  password: '03046dde4be5881f43f14721899122f31c2040ded7ca348eff6ad975f210adc6'
}

const pool = new Pool({
  host: signerOptions.hostname,
  port: signerOptions.port,
  user: signerOptions.username,
  database: 'dflofsvq96m4al',
  password: signerOptions.password,
})
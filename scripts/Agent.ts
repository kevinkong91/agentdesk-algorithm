import { Agent } from '../models'
import client from '../utils/db'

// Mock helper functions that are out-of-scope
const getAgent = async (id) => {
  await client.connect();
  let result
  const sql = `SELECT * FROM agents WHERE id = ${id} LIMIT 1`

  const query = client.query(sql)
  query.on('row', (row) => {
    const agent = new Agent()
    agent.name = row.name
    agent.email = row.email
    result = agent
  })
  query.on('end', () => {
    client.end()
    return result
  })
}

export { getAgent }
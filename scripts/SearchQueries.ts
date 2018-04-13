import { SearchQuery, PropertyType } from '../models'
import client from '../utils/db'
import { getAgent } from './'

// Mock helper functions that are out-of-scope
const fetchAndMapObjects = (object) => {
  return [object]
}

const getSearchQueries = async () => {
  await client.connect();

  const results = []
  
  // Fetch all Search Queries - this list must be exhaustively evaluated for potential matches
  const sql = 'SELECT * FROM search_queries'

  const query = client.query(sql)
  query.on('row', async (row) => {
    const agent = await getAgent(row.author)
    const searchQuery = new SearchQuery()
    searchQuery.budget = row.budget,
    searchQuery.bed = row.bed,
    searchQuery.bath = row.bath,
    searchQuery.propertyTypes = fetchAndMapObjects(row.propertyTypes),
    searchQuery.neighborhoods = fetchAndMapObjects(row.neighborhoods),
    searchQuery.author = agent,
    results.push(searchQuery)
  })
  query.on('end', () => {
    client.end()
    return results
  })
  return 
}

export { getSearchQueries }
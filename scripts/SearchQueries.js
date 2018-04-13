import { SearchQuery } from '../models'
import client from '../utils/db'

// Mock helper functions that are out-of-scope
const fetchAndMapObjects = (object) => {
  return [objects]
}

const getSearchQueries = async () => {
  await client.connect();

  const results = []
  
  // Fetch all Search Queries - this list must be exhaustively evaluated for potential matches
  const sql = 'SELECT * FROM search_queries'

  const query = client.query(sql)
  query.on('row', (row) => {
    const searchQuery = new SearchQuery({
      budget: row.budget,
      bed: row.bed,
      bath: row.bath,
      propertyTypes: fetchAndMapObjects(row.propertyTypes),
      neighborhoods: row.neighborhoods,
      author: fetchAndMapObjects(row.author),
    })
    results.push(searchQuery)
  })
  query.on('end', () => {
    client.end()
    return results
  })
  return 
}

export { getSearchQueries }
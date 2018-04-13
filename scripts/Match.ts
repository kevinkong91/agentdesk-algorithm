import { Property, PropertyStore, SearchQuery, Match } from '../models'
import { getSearchQueries, getProperties } from './'

const findMatches = async () => {
  const matches = []
  const searchQueries: [SearchQuery] = await getSearchQueries()
  await searchQueries.forEach(async (searchQuery: SearchQuery) => {
    const matchingProperties = await PropertyStore.lookupProperty(searchQuery)
    const results = matchingProperties.map((property: Property) => {
      return new Match({ property, buyingAgent: searchQuery.author })
    })
    matches.push(results)
  })
  return matches
}

export { findMatches }
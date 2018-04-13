import { Agent, PropertyType } from './'

class SearchQuery {
  budget: number
  bed: number
  bath: number
  propertyTypes: [PropertyType]
  neighborhoods: [string]
  author: Agent
}

export { SearchQuery }
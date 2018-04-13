import { Agent } from './'

type PropertyType = 'apartment' | 'condo' | 'townhouse'

interface Property {
  price: number,
  propertyType: PropertyType,
  locale: string,
  listingAgent: Agent
}

export { PropertyType, Property }
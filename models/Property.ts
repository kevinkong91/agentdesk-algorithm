import { Agent } from './'

type PropertyType = 'apartment' | 'condo' | 'townhouse'

class Property {
  price: number
  propertyType: PropertyType
  addressStreet: string
  addressCity: string
  addressState: string
  listingAgent: Agent
}

export { PropertyType, Property }
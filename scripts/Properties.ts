import { Property, Agent, PropertyStore } from '../models'
import client from '../utils/db'
import { getAgent } from './'

const getProperties = async () => {
  await client.connect();
  const results = []
  const sql = 'SELECT * FROM properties'

  const query = client.query(sql)
  query.on('row', async (row) => {
    const agent = await getAgent(row.listingAgent)
    const property = new Property()
    property.price = row.price
    property.propertyType = row.propertyType
    property.addressStreet = row.addressStreet
    property.addressCity = row.addressCity
    property.addressState = row.addressState
    property.listingAgent = agent
    results.push(property)
  })
  query.on('end', () => {
    client.end()
    return results
  })
}

const createPropertyStore = async () => {
  const propertyObjects = await getProperties()
  propertyObjects.forEach((property: Property) => { PropertyStore.addProperty(property) })
}

export { getProperties, createPropertyStore }
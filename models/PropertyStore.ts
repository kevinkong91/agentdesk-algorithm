import { Property, SearchQuery } from './'

/*

At the highest levels, PropertyStore is structured as a HashMap that buckets Property
by STATE, CITY, then PROPERTY_TYPE.

PROS:
* Constant run-time lookup for each designation.
* STATE and CITY designations are unique and non-colliding, good conditions for a HashMap.
* PROPERTY_TYPE is a non-overlapping 1-to-1 mapping feature good for a HashMap
    (no property is both a condo AND a townhouse)
* Geographical bounds will narrow down the subset of matches by a significant factor.

CONS:
* There will be a non-trivial cost for dynamic allocation if a particular HashMap gets too large,
    but we assume that this cost is within allowance, given the once-a-day frequency &
    lack of resource constraints in the requirements.

{
  'STATE': {
    'CITY': {
      'APARTMENT': ...,
      'CONDO': ...,
      'TOWNHOUSE': ...
    }
  }
}

===========

Once key'd into the CITY object, the store will be structured as a BST.

Why BST?
* If properties are pre-sorted by price, lookup can run efficiently.
* BST dynamically allocates memory for each Property write operation, whereas the same operation on a
    sorted list would consume unnecessary memory to copy the array.
* Project assumes that, given the daily execution of algorithm, there will be enough time to
    pre-process data to trade off for speedy execution of lookup at the specified time
    (e.g. notification email must be sent out at 9am every morning to all agents).

Below implementation assumes there are several helpers for out-of-scope functions:
- neighborhoodMatrixFromString()       - e.g. Google Maps API func: (neighborhoodName) => GLMatrix
- isPropertyWithinNeighborhoodMatrix() - e.g. Google Maps API func: (addressString, GLMatrix) => bool
- readOrCreateObjectInHashMap()
- traverseInsertAndResortTree() - returns bool
- [BASIC queue functions - push/pop]

*/

// BST Node

interface Node {
  value: Property,
  leftChild?: Node,
  rightChild?: Node
}

const matchQueryToProperties = async (searchQuery: SearchQuery, propertyTreeRoot?: Node) => {

  // BFS Search - DFS will yield cheapest homes first, not necessarily the most appealing.
  // Pre-Order Traversal

  if (propertyTreeRoot == null) return null

  const matches = []
  const queue = []
  
  queue.push(propertyTreeRoot)
  
  while (queue.length !== 0) {
    const root = queue.pop()
    const isWithinNeighborhood = await isPropertyWithinNeighborhood(searchQuery, root.value)
    if (root.value.price < searchQuery.budget && isWithinNeighborhood) matches.push(root)
    if (root.leftChild) queue.push(root.leftChild)
    if (root.rightChild) queue.push(root.rightChild)
  }

  return matches
}

const isPropertyWithinNeighborhood = async (searchQuery: SearchQuery, property: Property) => {
  let isWithinBounds = false
  const neighborhoodMatrices = await neighborhoodMatrixFromString(searchQuery.neighborhoods)
  neighborhoodMatrices.forEach((matrix) => {
    const address = `${property.addressStreet}, ${property.addressCity}, ${property.addressState}`
    if (await isPropertyWithinNeighborhoodMatrix(address, matrix)) isWithinBounds = true
  })
  return isWithinBounds
}

var PropertyStore = {
  _store: {},

  addProperty: (property: Property) => {
    // TODO: abstract this into readOrCreateObjectInHashMap() for safety
    const propertyTreeRoot = this._store[property.addressState][property.addressCity][property.propertyType]
    return traverseInsertAndResortTree(propertyTreeRoot)
  },

  lookupProperty: async (searchQuery: SearchQuery) => {
    // TODO: abstract this into readOrCreateObjectInHashMap() for safety
    const propertyTreeRoot = this._store[searchQuery.addressState][searchQuery.addressCity][searchQuery.propertyType]
    const matchingProperties = await matchQueryToProperties(searchQuery, propertyTreeRoot)
    return matchingProperties
  }
}

export { PropertyStore }
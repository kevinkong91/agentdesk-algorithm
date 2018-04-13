const AWS = require('aws-sdk')
const apiVersion = '2018-04-13'
const ses = new AWS.SES({ apiVersion })
import { Agent, Match } from '../models'

const params = (recipient: Agent, subject: string, body: string) => {
  return {
    Destinations: [
      {
        Destination: {
          ToAddresses: [recipient]
        },
        Message: [
          Body: {
            Text: {
              Data: body
            }
          },
          Subject: {
            Data: subject
          }
        ]
    },
    ],
    Source: 'hello@agentdesks.com'
  }
}

const alertAgentsForMatch = async (match: Match) => {
  const subjectListing = `New buyer interest!`
  const subjectBuying = `We found a new match!`

  const agentListing = match.property.listingAgent
  const agentBuying = match.buyingAgent

  const bodyListing = `Hi ${agentListing.name}, We found a buyer looking for a home you represent! ${match.property.addressStreet} for $${match.property.price}`
  const bodyBuying = `Hi ${agentBuying.name}, We found a new match! ${match.property.addressStreet} for $${match.property.price}`

  try {
    await ses.sendEmail(params(agentListing.email, subjectListing, bodyListing)).promise()
    await ses.sendEmail(params(agentBuying.email, subjectBuying, bodyBuying)).promise()
    console.log('Successfully sent alerts!')
  } catch (error) {
    console.log('Failed to send alerts with error: ', error)
  }
}

export { alertAgentsForMatch }
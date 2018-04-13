import { SearchQuery } from './'

type AgentType = 'buying' | 'listing'

class Agent {
  name: string
  email: string
  agentType: AgentType
}

export { Agent, AgentType }
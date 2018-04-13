import { Match, Property } from './models'
import { createPropertyStore, findMatches, alertAgentsForMatch } from './scripts/'

const runApp = async () => {
  await createPropertyStore()
  const matches = await findMatches()
  await matches.forEach(async (match: Match) => {
    await alertAgentsForMatch(match)
  })
}

const AgentDesks = () => {
  runApp()
}
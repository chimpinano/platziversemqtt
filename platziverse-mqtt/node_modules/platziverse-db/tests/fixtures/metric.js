'use strict'

const agents = require('./agent')

const metric = {
  id: 1,
  agentId: 1,
  type: 'ram',
  value: '1064',
  createAt: new Date()
}

const metrics = [
  join(metric, agents),
  join(extend(metric, {id: 2, agentId: 2, type: 'solid disk', value: '512GB'}), agents),
  join(extend(metric, {id: 3, agentId: 3, type: 'monitor'}), agents),
  join(extend(metric, {id: 4, agentId: 4, type: 'cpu', value: '3.7GHZ'}), agents)
]

function extend (obj, values) {
  const clone = Object.assign({}, obj)
  return Object.assign(clone, values)
}

function join (metric, agents) {
  return agents.all.filter(element => (element.id === metric.agentId)).map(element => {
    metric.Agent = element
    return metric
  }).shift()
}

function findByAgentUuid (uuid) {
  return metrics.filter(element => element.Agent.uuid === uuid).map(element => {
    if (element.Agent.uuid === uuid) {
      return element.type
    }
  }).shift()
}

function sortByCreated (prop) {
  return (a, b) => {
    let aProp = new Date(a[prop])
    let bProp = new Date(b[prop])

    return aProp - bProp
  }
}

function findByTypeAgentUuid (type, uuid) {
  return metrics.filter(element => element.Agent.uuid === uuid && element.type === type).map(element => {
    return element
  }).sort(sortByCreated).reverse()
}

module.exports = {
  single: metric,
  all: metrics,
  findByAgentUuid,
  findByTypeAgentUuid
}
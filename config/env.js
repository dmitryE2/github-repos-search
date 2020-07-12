const NODE_ENVIRONMENTS = ['development', 'production', 'test']
const DEFAULT = 'production'

const nodeEnv = process.env.NODE_ENV

module.exports = {
  nodeEnv: nodeEnv && NODE_ENVIRONMENTS.includes(nodeEnv) ? nodeEnv : DEFAULT,
}

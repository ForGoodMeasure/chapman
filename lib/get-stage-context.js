
export default function getStageContext(config, req) {
  const nodeEnv = process.env.node_env || 'dev';
  const stageConfig = config.stage[nodeEnv];
  return Object.assign({}, stageConfig);
}

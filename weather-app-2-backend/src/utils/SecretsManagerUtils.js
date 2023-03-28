const { SecretsManager } = require('@aws-sdk/client-secrets-manager');

async function getSecretValue(params) {
  const client = new SecretsManager({
    region: params.region || 'eu-west-2',
  });
  //
  const response = await client.getSecretValue({
    SecretId: params.secretId,
  });
  return response;
}

module.exports = {
  getSecretValue,
};

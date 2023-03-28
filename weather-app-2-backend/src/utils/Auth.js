const {
  getSecretValue,
} = require('./SecretsManagerUtils');

const {
  API_SECRET_ARN,
} = require('./config');

const returnObject = {
  isAuthorized: false,
};

async function authenticate(event, context) {
  console.log(`Auth event: ${JSON.stringify(event, null, 4)}`);

  const { authorization } = event.headers;
  const requestAuthorization = authorization.split(' ');

  const secretResponse = await getSecretValue({
    secretId: API_SECRET_ARN,
    region: 'eu-west-2',
  });
  const secret = (JSON.parse(secretResponse.SecretString)).auth;

  if (requestAuthorization[0] === 'Bearer' && requestAuthorization[1] === secret) {
    returnObject.isAuthorized = true;
  }

  console.log(`returning object: ${JSON.stringify(returnObject)}`);
  return returnObject;
}

module.exports = {
  authenticate,
};

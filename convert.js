const each = require('lodash/each');
const fs = require('fs');
const path = require('path');
const jsonToEnv = require('./convert-env');


const conversion = (json) => {
    const data = parsePostmanEnvironment(json);
    const env = jsonToEnv(data);
    console.log(env);
}

const getEnvName = (json) => {
    return parsePostmanEnvironment(json).name + ".bru";
}

const parsePostmanEnvironment = (str) => {
    try {
        str = path.join(__dirname, str);
        const data = fs.readFileSync(str);
        let environment = JSON.parse(data);
        return importPostmanEnvironment(environment);
    } catch (err) {
        console.log(err);
    }
}

const importPostmanEnvironmentVariables = (brunoEnvironment, values) => {
    brunoEnvironment.variables = brunoEnvironment.variables || [];
  
    each(values, (i) => {
      const brunoEnvironmentVariable = {
        name: i.key,
        value: i.value,
        enabled: i.enabled,
        secret: isSecret(i.type)
      };
  
      brunoEnvironment.variables.push(brunoEnvironmentVariable);
    });
  };
  
const importPostmanEnvironment = (environment) => {
    const brunoEnvironment = {
      name: environment.name,
      variables: []
    };
  
    importPostmanEnvironmentVariables(brunoEnvironment, environment.values);
    return brunoEnvironment;
  };

  const isSecret = (type) => {
    return type === 'secret';
  };

module.exports = {
    conversion,
    getEnvName
};
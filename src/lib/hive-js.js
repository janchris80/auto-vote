import hive from '@hiveio/hive-js';

export default function hiveJs() {
  // const apiEndpoints = [
  //   'https://api.hive.blog',
  //   'https://rpc.ecency.com/',
  //   'https://hive-api.3speak.tv/',
  //   'https://hived.privex.io',
  //   'https://anyx.io',
  //   'https://api.deathwing.me',
  //   'https://hived.emre.sh',
  //   'https://hive-api.arcange.eu',
  //   'https://api.openhive.network',
  //   'https://techcoderx.com',
  //   'https://hive.roelandp.nl',
  //   'https://api.c0ff33a.uk',
  // ];

  // function checkEndpoint(endpoint) {
  //   return new Promise((resolve, reject) => {
  //     hive.api.setOptions({ url: endpoint });

  //     hive.api.getAccounts(['username'], (err, result) => {
  //       if (err) {
  //         console.error(`Endpoint ${endpoint} is not working.`);
  //         reject(err);
  //       } else {
  //         console.log(`Endpoint ${endpoint} is working.`);
  //         resolve(endpoint);
  //       }
  //     });
  //   });
  // }

  // async function findWorkingEndpoint() {
  //   for (const endpoint of apiEndpoints) {
  //     try {
  //       const result = await checkEndpoint(endpoint);
  //       return result;
  //     } catch (error) {
  //       // continue to the next endpoint
  //     }
  //   }
  //   throw new Error('No working endpoints found.');
  // }

  // // Usage
  // findWorkingEndpoint()
  //   .then((workingEndpoint) => {
  //     console.log(`Using ${workingEndpoint} as the API endpoint.`);
  //   })
  //   .catch((error) => {
  //     console.error(error.message);
  //   });

  hive.api.setOptions({ url: 'https://api.hive.blog' });
  hive.config.set('alternative_api_endpoints', [
    'https://api.hive.blog',
    'https://hive-api.3speak.tv/',
    'https://hived.privex.io',
    'https://anyx.io',
    'https://api.deathwing.me',
    'https://hived.emre.sh',
    'https://hive-api.arcange.eu',
    'https://api.openhive.network',
    'https://techcoderx.com',
    'https://hive.roelandp.nl',
    'https://api.c0ff33a.uk',
  ]);

  return hive;
}
import CGUs from '../src/app/index.js';

(async () => {
  const app = new CGUs();
  await app.init();

  const numberOfServices = app.serviceIds.length;
  const numberOfDocuments = app.serviceIds.reduce((acc, serviceId) => acc + Object.keys(app.serviceDeclarations[serviceId].documents).length, 0);

  console.log(`${numberOfServices} services`);
  console.log(`${numberOfDocuments} documents`);
})();
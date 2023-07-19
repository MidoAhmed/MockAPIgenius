// seeder function
export default function (server) {
  server.createList('doctor', 10);
  server.createList('patient', 10);
  server.createList('appointment', 10);
}

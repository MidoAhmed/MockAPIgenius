import { setupServer, SetupServer } from 'msw/node';
import { drop } from '@mswjs/data';
import { handlers } from './handlers/handlers';
import { db } from './factories/db';

interface ExtendedSetupServer extends SetupServer {
  /**
   * The database instance used by the server.
   * @type {typeof db}
   */
  db: typeof db;

  /**
   * Seeds the database with data using the provided seeder function.
   * @function
   * @name ExtendedSetupServer.seeds
   * @param {SeederFunction} seeder - The function that will seed the database with data.
   * @example
   * // Seed the database
   * server.seeds(dbInstance => {
   *   // seed the database here
   *   dbInstance.patient.create();
   * });
   */
  seeds: (seeder: SeederFunction) => void;

  cleanDatabase: () => void;
}

/**
 * A function that seeds the database with data.
 * @typedef {function} SeederFunction
 * @param {typeof db} dbInstance - The database instance to seed with data.
 */
type SeederFunction = (dbInstance: typeof db) => void;

/**
 * Creates an extended server instance with the ability to seed the database.
 * @function
 * @name setupExtendedServer
 * @param {Parameters<typeof setupServer>} handlers - The request handlers to use with the server.
 * @returns {ExtendedSetupServer} - The extended server instance.
 */
function setupExtendedServer(handlers: Parameters<typeof setupServer>) {
  const server = setupServer(...handlers) as ExtendedSetupServer;

  // expose the db instance to the server instance readOnly property (for testing purposes)
  server.db = db;

  server.seeds = function (seeder: SeederFunction) {
    seeder(db);
  };

  server.cleanDatabase = function () {
    drop(server.db);
  };

  return server;
}

// Create a new server instance
export const server = setupExtendedServer(handlers);

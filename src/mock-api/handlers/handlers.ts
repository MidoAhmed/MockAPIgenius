import { rest } from 'msw';
import { doctorHandlers } from './doctorHandler';
import { patientHandlers } from './patientHandlers';

// handlers for mock api server (msw) to intercept requests and return mock data  (see src/mock-api/browser.ts)
export const handlers = [
  ...patientHandlers,
  ...doctorHandlers,

  // catch all handler (if no other handler matches) to return error message
  rest.all('*', (req, res, ctx) => {
    return res(
      ctx.status(404),
      ctx.json({
        error: `Request handler for ${req.url.pathname} not found`,
      }),
    );
  }),
];

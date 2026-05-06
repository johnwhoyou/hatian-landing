export const dynamic = 'force-static';

const APP_ID = 'H94PVM5QE6.dev.johnjoyo.hatian';

const aasa = {
  applinks: {
    details: [
      {
        appIDs: [APP_ID],
        components: [
          { '/': '/g/*', comment: 'Group invite links' },
          { '/': '/u/*', comment: 'Profile links' },
        ],
      },
    ],
  },
};

export function GET() {
  return new Response(JSON.stringify(aasa), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}

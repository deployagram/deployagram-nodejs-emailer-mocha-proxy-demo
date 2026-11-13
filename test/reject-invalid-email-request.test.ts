import assert from 'node:assert/strict';
import { EmailerApplication } from '../src/emailer-application.js';
import { APP_URL, EMAILER_EMAIL_PATH } from './environment.js';

const MALFORMED_JSON = '{"email": "eddie@eddie.com"';

describe('RejectInvalidEmailRequestTest', () => {
  let application: EmailerApplication;
  let response: Response;

  before(async () => {
    application = new EmailerApplication();
    await application.start();
  });

  after(async () => {
    await application?.stop();
  });

  it('rejectsAnEmailThatIsNotValidJson', async () => {
    await whenMalformedJsonIsPosted();

    thenTheResponseIsBadRequest();
  });

  it('rejectsAnEmailRequestThatIsNotAPost', async () => {
    await whenTheEmailPathIsRequestedWithGet();

    thenTheResponseIsMethodNotAllowed();
  });

  async function whenMalformedJsonIsPosted(): Promise<void> {
    response = await fetch(APP_URL + EMAILER_EMAIL_PATH, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: MALFORMED_JSON,
    });
  }

  async function whenTheEmailPathIsRequestedWithGet(): Promise<void> {
    response = await fetch(APP_URL + EMAILER_EMAIL_PATH, {
      method: 'GET',
      headers: { Accept: 'application/json' },
    });
  }

  function thenTheResponseIsBadRequest(): void {
    assert.equal(response.status, 400);
  }

  function thenTheResponseIsMethodNotAllowed(): void {
    assert.equal(response.status, 405);
  }
});

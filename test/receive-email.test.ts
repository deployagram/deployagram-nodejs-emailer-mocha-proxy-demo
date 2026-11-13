import assert from 'node:assert/strict';
import { EmailerApplication } from '../src/emailer-application.js';
import { APP_URL, EMAILER_EMAIL_PATH } from './environment.js';

const EMAIL_JSON = `{
  "email": "eddie@eddie.com",
  "subject": "Test email subject in here",
  "body": "Simple text email body"
}`;

describe('ReceiveEmailTest', () => {
  let application: EmailerApplication;
  let response: Response;

  before(async () => {
    application = new EmailerApplication();
    await application.start();
  });

  after(async () => {
    await application?.stop();
  });

  it('acceptsAnEmailRequest', async () => {
    await whenTheEmailIsPosted();

    thenTheResponseIsNoContent();
    thenTheResponseIsJson();
  });

  async function whenTheEmailIsPosted(): Promise<void> {
    response = await fetch(APP_URL + EMAILER_EMAIL_PATH, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: EMAIL_JSON,
    });
  }

  function thenTheResponseIsNoContent(): void {
    assert.equal(response.status, 204);
  }

  function thenTheResponseIsJson(): void {
    assert.ok(response.headers.get('content-type')?.includes('application/json'));
  }
});

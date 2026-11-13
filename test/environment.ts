/**
 * Ports and URLs shared by the tests. The Emailer runs on this machine, and the tests call it directly.
 */
export const APP_PORT = 8080;

export const APP_URL = `http://localhost:${APP_PORT}`;

export const EMAILER_EMAIL_PATH = '/Emailer/email';

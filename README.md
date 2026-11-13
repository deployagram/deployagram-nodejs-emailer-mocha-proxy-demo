# Deployagram Node.js Emailer demo (Mocha)

A minimal Node.js 22 / TypeScript HTTP service that accepts a request to send an email and logs it. It is the Node.js
port of `deployagram-java-emailer-demo`.

## The application

The application listens on port `8080` for `POST /Emailer/email`, with a JSON body of `email`, `subject` and
`body`. A valid request gets `204 No Content`. A body that is not valid JSON gets `400`. Any other method gets `405`.
Any other path gets `404`.

## Tests

```bash
npm install
npm test
```

The service tests call the Emailer directly over HTTP:

- `test/receive-email.test.ts` posts a valid email and checks for `204` and a JSON content type.
- `test/reject-invalid-email-request.test.ts` checks for `400` for malformed JSON, and `405` for a `GET`.

import { createDeployagramSuite, type DeployagramSuiteOptions } from '@deployagram/core';

/**
 * The Mocha adapter for @deployagram/core: wires the suite into Mocha's hooks. The core starts or finds
 * the Collector and the Proxy, posts the Proxy configuration, and marks each test's end. Mocha's test
 * title is the test name alone, so markers match the other adapters.
 */
export function useDeployagram(options: DeployagramSuiteOptions) {
  const suite = createDeployagramSuite(options);

  before(async function () {
    this.timeout(180_000);
    await suite.beforeAll();
  });
  beforeEach(() => suite.beforeEach());
  afterEach(function () {
    return suite.afterEach(this.currentTest?.title ?? '');
  });
  after(() => suite.stop());

  return suite;
}

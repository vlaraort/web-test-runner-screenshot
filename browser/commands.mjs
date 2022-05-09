import { executeServerCommand } from '@web/test-runner-commands';

export function makeScreenshot(options) {
    // return executeServerCommand('take-screenshot', { name: this.currentTest.title });
    return executeServerCommand('take-screenshot', options);
  }
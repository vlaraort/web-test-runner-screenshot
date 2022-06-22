# Web-test-runner-screenshot

This is a web-test-runner plugin to capture screenshots during regular tests in playwright.

## Usage

`npm install --save-dev web-test-runner-screenshot`

In your web-test-runner file

```javascript
import { takeScreenshotPlugin } from 'web-test-runner-screenshot/plugin';

export default {
    ...
    plugins: {
        ...
        takeScreenshotPlugin(),
    }
}
```


In your test file
```javascript
import { makeScreenshot } from 'web-test-runner-screenshot';
```

Inside your test

```javascript
      it('My awesome test', async () => {
        // My webcomponent test
        expect(true).to.be.true;
        await makeScreenshot({ name: 'my_screenshot-filename' });
      });
```

Or make it automatically to every test in your afterEach, based on the test title

```javascript
  afterEach(async function () { // Note that you can't use arrow function because you lose the currentTest context
    await makeScreenshot({ name: this.currentTest.title });
  });
```

## Parameters

makeScreenshot accepts a configuration parameter with the following options

| Parameter | Type    | Description                                 | Default value | Mandatory |
|-----------|---------|---------------------------------------------|---------------|-----------|
| name      | string  | name of the file                            | -             | yes       |
| browser   | boolean | append the browser context to the file name | false         | no        |
| folder    | string  | folder to store the screenshots             | evidences     | no        |
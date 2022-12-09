
import fs from 'fs';
import path from 'path';
import mkdirp from 'mkdirp';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);

const  saveImage = async ({ filePath, content }) => {
  await mkdirp(path.dirname(filePath));
  await writeFile(filePath, content);
}

export function takeScreenshotPlugin() {
    return {
      name: 'take-screen-command',
  
      async executeCommand({ command, payload, session }) {
        if (command === 'take-screenshot') {
            // handle specific behavior for playwright
          if (session.browser.type === 'playwright') {
            const page = session.browser.getPage(session.id);
            const destinationFolder = payload.folder || 'evidences'; 
            const screenshot = await page.screenshot();
            const sanitizedName = payload.name = payload.name.replaceAll('/', '-').replaceAll('"', `'`);
            const sanitizedFileName = `${sanitizedName}_${session.browser.product}`;
            await saveImage({ filePath: `./${destinationFolder}/${sanitizedFileName}.png`, content: screenshot})
            return true;
          }
  
          // you might not be able to support all browser launchers
          throw new Error(
            `Taking screenshots is not supported for browser type ${session.browser.type}.`,
          );
        }
        return undefined;
      },
    };
  }

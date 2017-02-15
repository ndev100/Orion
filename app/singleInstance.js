/**
 * Import/require this file to force the app to have one single instance
 */

import { app } from 'electron'

const shouldQuit = app.makeSingleInstance(() => {})

if (shouldQuit) {
  app.quit()
}

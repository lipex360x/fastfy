import { env } from '@/core/env'

import { version } from '../../package.json'
import { app } from './app'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log(`🚀 HTTP Server Running. 🚪 Port: ${env.PORT} - 📦 v${version}`)
  })

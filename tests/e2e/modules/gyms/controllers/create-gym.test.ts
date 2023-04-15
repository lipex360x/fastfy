import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import { app } from '@/http/app'

describe('[e2e] - Create Gym', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to TEST SOMETHING', async () => {
    const response = await request(app.server)
      .get('/THE_ROUTE')
      .set('header', 'value')
      .send()

    expect(response.statusCode).toEqual(200)
  })
})

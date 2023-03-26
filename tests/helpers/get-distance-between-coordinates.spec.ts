import { describe, expect, it } from 'vitest'

import { getDistanceBetweenCoordinates } from '@/core/helpers'

describe('getDistanceBetweenCoordinates', () => {
  it('should return 0 when latitudes and longitudes are identical', () => {
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: 2,
        longitude: 2,
      },
      {
        latitude: 2,
        longitude: 2,
      },
    )

    expect(distance).toBe(0)
  })
})

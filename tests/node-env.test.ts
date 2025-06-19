import { describe, expect, it } from 'vitest'
import { flexible } from '../src'

describe('morder flexible', () => {
  it('should throwe type error when env is not browser', () => {
    expect(() => flexible()).toThrowError('current environment is not browser')
  })
})

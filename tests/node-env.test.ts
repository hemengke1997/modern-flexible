import { describe, expect, test } from 'vitest'
import { flexible } from '../src'

describe('morder flexible', () => {
  test('should throwe type error when env is not browser', () => {
    expect(() => flexible()).toThrowError('current environment is not browser')
  })
})

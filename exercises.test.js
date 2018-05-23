/* global jest, describe, expect, test */


let exercises = require('./exercises')
let {
  identity,
  identityf,
  add,
  addf,
  sub,
  mul
} = exercises

describe('file', () => {
  test('identity', () => {
    expect(identity(5)).toEqual(5)
  })

  test('identityf', () => {
    let unity = identityf(5)
    expect(unity()).toEqual(5)
  })

  test('add', () => {
    expect(add(3, 4)).toEqual(7)
  })

  test('addf', () => {
    expect(addf(3)(4)).toEqual(7)
  })

  test('sub', () => {
    expect(sub(7, 4)).toEqual(3)
  })

  test('mul', () => {
    expect(mul(4, 5)).toEqual(20)
  })
})
/* global jest, describe, expect, test */


const exercises = require('./exercises')
const {
  identity,
  identityf,
  add,
  addf,
  sub,
  mul,
  curry,
  curryr,
  liftf
} = exercises

describe('fun with functions', () => {
  test('identity', () => {
    expect(identity(5)).toEqual(5)
  })

  test('identityf', () => {
    const unity = identityf(5)
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

  test('curry', () => {
    const add3 = curry(add, 3)

    expect(add3(4)).toEqual(7)
    expect(curry(mul, 5)(6)).toEqual(30)
  })

  test('curryr', () => {
    const dec = curryr(sub, 1)

    expect(dec(7)).toEqual(6)
  })

  test('liftf', () => {
    const addf = liftf(add)
    expect(addf(3)(4)).toEqual(7)
    expect(liftf(mul)(5)(6)).toEqual(30)
  })

  test('inc using already written functions', () => {
    let inc = curry(add, 1)
    expect(inc(5)).toEqual(6)
    expect(inc(inc(5))).toEqual(7)

    inc = liftf(add)(1)
    expect(inc(5)).toEqual(6)
    expect(inc(inc(5))).toEqual(7)

    inc = addf(1)
    expect(inc(5)).toEqual(6)
    expect(inc(inc(5))).toEqual(7)

    inc = curryr(add, 1)
    expect(inc(5)).toEqual(6)
    expect(inc(inc(5))).toEqual(7)
  })
})
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
  liftf,
  twice,
  reverse,
  composeu,
  composeb,
  limit,
  from,
  to,
  thru,
  fromTo,
  element,
  elementMod
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

  test('twice', () => {
    expect(add(11, 11)).toEqual(22)
    const double = twice(add)
    expect(double(11)).toEqual(22)
    const square = twice(mul)
    expect(square(11)).toEqual(121)
  })

  test('reverse', () => {
    const bus = reverse(sub)
    expect(bus(3, 2)).toEqual(-1)
  })

  test('composeu', () => {
    const double = twice(add)
    const square = twice(mul)
    expect(composeu(double, square)(5)).toEqual(100)
  })

  test('composeb', () => {
    expect(composeb(add, mul)(2, 3, 7)).toEqual(35)
  })

  test('limit', () => {
    let add_ltd = limit(add, 1)
    expect(add_ltd(3, 4)).toEqual(7)
    expect(add_ltd(3, 4)).toEqual(undefined)
  })

  test('from', () => {
    let index = from(0)
    expect(index()).toEqual(0)
    expect(index()).toEqual(1)
    expect(index()).toEqual(2)
  })

  test('to', () => {
    let index = to(from(2), 4)
    expect(index()).toEqual(2)
    expect(index()).toEqual(3)
    expect(index()).toEqual(undefined)
  })

  test('thru', () => {
    let index = thru(from(2), 4)
    expect(index()).toEqual(2)
    expect(index()).toEqual(3)
    expect(index()).toEqual(4)
    expect(index()).toEqual(undefined)
  })

  test('fromTo', () => {
    let index = fromTo(0, 3)
    expect(index()).toEqual(0)
    expect(index()).toEqual(1)
    expect(index()).toEqual(2)
    expect(index()).toEqual(undefined)
  })

  test('element', () => {
    let ele = element([
      'a', 'b', 'c', 'd'
    ], fromTo(1, 3))

    expect(ele()).toEqual('b')
    expect(ele()).toEqual('c')
    expect(ele()).toEqual(undefined)
  })

  test('elementMod', () => {
    let ele = element([
      'a', 'b', 'c', 'd'
    ])
    expect(ele()).toEqual('a')
    expect(ele()).toEqual('b')
    expect(ele()).toEqual('c')
    expect(ele()).toEqual('d')
    expect(ele()).toEqual(undefined)
  })
})
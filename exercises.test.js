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
  elementMod,
  collect,
  filter,
  concat,
  gensymf,
  fibonaccif,
  counter,
  revocable,
  addg,
  liftg,
  join,
  continuize
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

  test('collect', () => {
    let array = []
    let col = collect(fromTo(0, 2), array)
    expect(col()).toEqual(0)
    expect(col()).toEqual(1)
    expect(col()).toEqual(undefined)
    expect(array).toEqual([0, 1])
  })

  test('filter', () => {
    const divisibleByThree = (value) => {
      return (value % 3) === 0
    }
    let fil = filter(
      fromTo(0, 5),
      divisibleByThree
    )
    expect(fil()).toEqual(0)
    expect(fil()).toEqual(3)
    expect(fil()).toEqual(undefined)
  })

  test('concat', () => {
    let con = concat(fromTo(0, 3), fromTo(0, 2))
    expect(con()).toEqual(0)
    expect(con()).toEqual(1)
    expect(con()).toEqual(2)
    expect(con()).toEqual(0)
    expect(con()).toEqual(1)
    expect(con()).toEqual(undefined)
  })

  test('gensymf', () => {
    let geng = gensymf('G')
    let genh = gensymf('H')
    expect(geng()).toEqual('G1')
    expect(genh()).toEqual('H1')
    expect(geng()).toEqual('G2')
    expect(genh()).toEqual('H2')
  })

  test('fibonaccif', () => {
    let fib = fibonaccif(0, 1)
    expect(fib()).toEqual(0)
    expect(fib()).toEqual(1)
    expect(fib()).toEqual(1)
    expect(fib()).toEqual(2)
    expect(fib()).toEqual(3)
    expect(fib()).toEqual(5)
  })

  test('counter', () => {
    let object = counter(10)
    let up = object.up
    let down = object.down
    expect(up()).toEqual(11)
    expect(down()).toEqual(10)
    expect(down()).toEqual(9)
    expect(up()).toEqual(10)
  })

  test('revocalbe', () => {
    let rev = revocable(add)
    let add_rev = rev.invoke
    expect(add_rev(3, 4)).toEqual(7)
    rev.revoke()
    expect(add_rev(5, 7)).toEqual(undefined)
  })

  test('addg', () => {
    expect(addg()).toEqual(undefined)
    expect(addg(2)()).toEqual(2)
    expect(addg(2)(7)()).toEqual(9)
    expect(addg(3)(0)(4)()).toEqual(7)
    expect(addg(1)(2)(4)(8)()).toEqual(15)
  })

  test.skip('liftg', () => {
    expect(liftg(mul)()).toEqual(undefined)
    expect(liftg(mul)(3)()).toEqual(3)
    expect(liftg(mul)(3)(0)(4)()).toEqual(0)
    expect(liftg(mul)(1)(2)(4)(8)).toEqual(64)
  })

  test('join', () => {
    let gr = join(
      function div(a, b) {
        return a / b
      },
      fibonaccif(3, 5),
      fibonaccif(2, 3)
    )
    expect(gr()).toEqual(1.5)
    expect(gr()).toEqual(1.667)
    expect(gr()).toEqual(1.6)
    expect(gr()).toEqual(1.625)
    expect(gr()).toEqual(1.615)
  })

  test('continuize', () => {
    let sqrtc = continuize(Math.sqrt)
    expect(sqrtc(console.log, 81)).toEqual(9)
  })
})
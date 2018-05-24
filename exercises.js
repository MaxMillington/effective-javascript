
const identity = (x) => {
  return x
}

const identityf = (x) => {
  return () => {
    return x
  }
}

const add = (x, y) => {
  return x + y
}

const addf = (x) => {
  return (y) => {
    return y + x
  }
}

const sub = (x, y) => {
  return x - y
}

const mul = (x, y) => {
  return x * y
}

const curry = (binary, x) => {
  return (y) => {
    return binary(x, y)
  }
}

const curryr = (binary, y) => {
  return (x) => {
    return binary(x, y)
  }
}

const liftf = (binary) => {
  return (x) => {
    return (y) => {
      return binary(x, y)
    }
  }
}

const twice = (binary) => {
  return (x) => {
    return binary(x, x)
  }
}

const reverse = (binary) => {
  return (...args) => {
    return binary(...args.reverse())
  }
}

const composeu = (unary1, unary2) => {
  return (x) => {
    return unary2(unary1(x))
  }
}

const composeb =(binary1, binary2) => {
  return (x, y, z) => {
    return binary2(binary1(x, y), z)
  }
}

const limit = (binary, timesAllowed) => {
  let callTimes = 0

  return (y, z) => {
    if (callTimes < timesAllowed) {
      let value = binary(y, z)
      callTimes += 1
      return value
    }
  }
}

const from = (startValue) => {
  return () => {
    let returnValue = startValue
    startValue += 1
    return returnValue
  }
}

const to = (generator, endValue) => {
  return () => {
    let returnValue = generator()
    if (returnValue < endValue) {
      return returnValue
    }
  }
}

const thru = (generator, endValue) => {
  return () => {
    let returnValue = generator()
    if (returnValue <= endValue) {
      return returnValue
    }
  }
}

const fromTo = (startValue, endValue) => {
  return () => {
    let returnValue = startValue
    if (returnValue < endValue) {
      startValue += 1
      return returnValue
    }
  }
}

const element = (array, generator) => {
  const fromTo = (startValue, endValue) => {
    return () => {
      let returnValue = startValue
      if (returnValue < endValue) {
        startValue += 1
        return returnValue
      }
    }
  }
  if (generator === undefined) {
    generator = fromTo(0, array.length)
  }
  return () => {
    let index = generator()
    return array[index]
  }
}

const elementMod = (array) => {
  let index = 0
  return () => {
    let returnValue = array[index]
    index += 1
    return returnValue
  }
}

const collect = (generator, array) => {
  return () => {
    let returnValue = generator()
    if (returnValue !== undefined) {
      array.push(returnValue)
    }
    return returnValue
  }
}

const filter = (generator, predicate) => {
  return function filterGenerator() {
    let value = generator()
    if (value === undefined || predicate(value)) {
      return value
    }
    return filterGenerator()
  }
}

const concat = (generator1, generator2) => {
  return () => {
    let res = generator1()
    if(res ===  undefined) { res = generator2() }
    return res
  }
}

const gensymf = (letter) => {
  let count = 0
  return () => {
    count += 1
    return letter + `${count}`
  }
}

const fibonaccif = (x, y) => {
  return () => {
    let next = x
    x = y
    y += next
    return next
  }
}

const counter = (number) => {
  return {
    up: () => {
      number += 1
      return number
    },
    down: () => {
      number -= 1
      return number
    }
  }
}

const revocable = (binary) => {
  return {
    invoke: (...args) => {
      if (binary !== undefined) {
        return binary(...args)
      }
    },
    revoke: () => { binary = undefined }
  }
}

const addg = (first) => {
  if (first !== undefined) {
    return function more(next) {
      if (next === undefined) {
        return first
      }
      first += next
      return more
    }
  }
}

const liftg = (binary) => {
  return function g(first) {
    if (first === undefined) {
      return first
    }
    return function more(next) {
      if (next === undefined) {
        return first
      }
      first = binary(first, next)
      return more
    }
  }
}

const precisionRound = (number, precision) => {
  let factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const join = (func, gen1, gen2) => {
  return () => {
    return precisionRound(func(gen1(), gen2()), 3)
  }
}

const continuize = (unary) => {
  return (callback, arg) => {
    // return callback(unary(arg))
    return unary(arg)
  }
}

module.exports = {
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
}

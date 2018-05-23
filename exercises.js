module.exports = {
  identity: (x) => {
    return x
  },

  identityf: (x) => {
    return () => {
      return x
    }
  },

  add: (x, y) => {
    return x + y
  },

  addf: (x) => {
    return (y) => {
      return y + x
    }
  },

  sub: (x, y) => {
    return x - y
  },

  mul: (x, y) => {
    return x * y
  },

  curry: (binary, x) => {
    return (y) => {
      return binary(x, y)
    }
  },

  curryr: (binary, y) => {
    return (x) => {
      return binary(x, y)
    }
  },

  liftf: (binary) => {
    return (x) => {
      return (y) => {
        return binary(x, y)
      }
    }
  },

  twice: (binary) => {
    return (x) => {
      return binary(x, x)
    }
  },

  reverse: (binary) => {
    return (...args) => {
      return binary(...args.reverse())
    }
  },

  composeu: (unary1, unary2) => {
    return (x) => {
      return unary2(unary1(x))
    }
  },

  composeb: (binary1, binary2) => {
    return (x, y, z) => {
      return binary2(binary1(x, y), z)
    }
  },

  limit: (binary, timesAllowed) => {
    let callTimes = 0

    return (y, z) => {
      if (callTimes < timesAllowed) {
        let value = binary(y, z)
        callTimes += 1
        return value
      }
    }
  },

  from: (startValue) => {
    return () => {
      let returnValue = startValue
      startValue += 1
      return returnValue
    }
  },

  to: (generator, endValue) => {
    return () => {
      let returnValue = generator()
      if (returnValue < endValue) {
        return returnValue
      }
    }
  },

  thru: (generator, endValue) => {
    return () => {
      let returnValue = generator()
      if (returnValue <= endValue) {
        return returnValue
      }
    }
  },

  fromTo: (startValue, endValue) => {
    return () => {
      let returnValue = startValue
      if (returnValue < endValue) {
        startValue += 1
        return returnValue
      }
    }
  },

  element: (array, generator) => {
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
  },

  elementMod: (array) => {
    let index = 0
    return () => {
      let returnValue = array[index]
      index += 1
      return returnValue
    }
  }
}

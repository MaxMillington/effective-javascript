module.exports = {
  identity:  (x) => {
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
  }
}

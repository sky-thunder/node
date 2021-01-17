const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resovlePromise(promise2, x, resolve, reject) {
  // console.log(...arguments)
  if (promise2 === x) {
    return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
  }
  if (typeof x === 'function' || (typeof x === 'object' && x !== null)) {
    let called = false
    try {
      let then = x.then
      if (typeof then === 'function') {
        then.call(x, y => {
          if (called) return
          called = true
          resovlePromise(promise2, y, resolve, reject)
          // resolve(y)
        }, e => {
          if (called) return
          called = true
          reject(e)
        })
      } else {
        resolve(x)
      }
    } catch (e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
class Promise {
  constructor(executer) {
    this.state = PENDING
    this.value = undefined
    this.reason = undefined

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    const resolve = (value) => {
      if (this.state === PENDING) {
        this.state = FULFILLED
        this.value = value

        this.onFulfilledCallbacks.forEach(fn => fn())
      }
    }
    const reject = (value) => {
      if (this.state === PENDING) {
        this.state = REJECTED
        this.reason = value

        this.onRejectedCallbacks.forEach(fn => fn())
      }
    }
    try {
      executer(resolve, reject)
    } catch (e) {
      // console.log(e)
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : data => data
    onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resovlePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resovlePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }, 0)
      }

      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resovlePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resovlePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }, 0)
        })
      }
    })

    return promise2
  }
}

Promise.defer = Promise.deferred = function () {
  let dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })

  return dfd
}

module.exports = Promise
const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

function resovlePromise(promise2, x, resolve, reject) {
  console.log(...arguments)
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

module.exports = Promise
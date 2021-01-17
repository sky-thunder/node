const PENDING = 'PENDING'
const FULFILLED = 'FULFILLED'
const REJECTED = 'REJECTED'

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
    } catch(e){
      reject(e)
    }
  }
  then(onFulfilled, onRejected) {
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === FULFILLED) {
        const value = onFulfilled(this.value)
        resolve(value)
      }
      if (this.state === REJECTED) {
        onRejected(this.reason)
      }
  
      if (this.state === PENDING) {
        this.onFulfilledCallbacks.push(() => {
          onFulfilled(this.value)
        })
  
        this.onRejectedCallbacks.push(() => {
          onRejected(this.reason)
        })
      }
    })

    return promise2
  }
}

module.exports = Promise
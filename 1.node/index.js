// console.log(global)
setTimeout(() => {
  console.log('setTimeout 1')
  process.nextTick(() => {
    console.log('fuck process.nextTick')
  })
}, 300)
setTimeout(() => {
  console.log('setTimeout 2')
}, 300)

// 新增加微任务 process.nextTick
process.nextTick(() => {
  console.log('process.nextTick')
})

// 新增加微任务
queueMicrotask(() => {
  console.log('queueMicrotask 1')
})

const p1 = Promise.resolve(1111)

// 新增加微任务
queueMicrotask(() => {
  console.log('queueMicrotask 2')
  p1.then(data => {
    console.log('promise then', data)
  })
})
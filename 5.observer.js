class Subject {
  constructor (name) {
    this.name = name
    this.state = '开心'
    this.observers = []
  }

  observer (o) {
    this.observers.push(o)
  }

  setState (newState) {
    this.state = newState
    
    this.observers.forEach(o => {
      o.update(this)
    })
  }
}


class Observer {
  constructor (name) {
    this.name = name
  }

  update (subject) {
    console.log(`${this.name}收到了${subject.name}状态变化：${subject.state}`)
  }
}

const baby = new Subject('宝宝')
const father = new Observer('父亲')
const mother = new Observer('母亲')

baby.observer(father)
baby.observer(mother)
baby.setState('被人欺负了')

class BaseComponent {
    constructor() {
        if (this.constructor === BaseComponent) {
            throw new Error('Abstract class can\'t be instantiated!')
        }
    }
        getProxyState(initialState) {
        return new Proxy(initialState, {
            get: (target, prop) => {
                return target[prop]
            },
            set: (target, prop, newValue) => {
                const oldValue = target[prop]

                target[prop] = newValue

                if (newValue !== oldValue) {
                    this.updateUI()
                }
                
                return true
            },
        })
    }

    /**
     * Перерисовка UI в ответ на обноваление состояния
     */
    updateUI() {
        throw new Error(`${this.constructor.name}: updateUI() must be implemented`)
    }
}

export default BaseComponent
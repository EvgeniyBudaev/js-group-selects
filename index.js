class Select {
    constructor(selector, options) {
        this.$el = document.querySelector(selector)
        this.options = options
        this.selectedId = options.selectedId

        this.inputHidden = document.querySelector('[data-input="hidden"]')
        this.inputHiddenValue = null
        this.data = null

        this.span = this.$el.querySelector('[data-type="value"]') // fixed

        this.render()
        this.setup()
    }

    render() {
        //console.log('this.options', this.options);
        if (this.$el) {
            this.$el.classList.add('select')
        }
    }

    setup() {
        //console.log('this.current', this.current);
        //console.log('this.$selects', this.$selects);
        this.data = this.generateArrayObjects(this.$el)
        //console.log('this', this);
        //console.log('this.data', this.data);
        this.inputHiddenValue = this.current.value
        this.inputHidden.value = this.inputHiddenValue

        this.span.innerHTML = this.current.value

        this.clickHandler = this.clickHandler.bind(this)
        if (this.$el) {
            this.$el.addEventListener('click', this.clickHandler)
            this.$value = this.$el.querySelector('[data-type="value"]')
        }
    }

    clickHandler(event) {
        const {type} = event.target.dataset
        if (type === 'input' || type === 'value' || type === 'arrow') {
            this.toggle()
        } else if (type === 'item') {
            //console.log('event.target', event.target)
            const id = event.target.dataset.id
            this.select(id)
        } else if (type === 'backdrop') {
            this.close()
        }
    }

    get isOpen() {
        return this.$el.classList.contains('open')
    }

    get current() {
        return this.data.find(el => el.id === this.selectedId)
    }

    select(id) {
        this.selectedId = id
        this.$value.textContent = this.current.value
        this.close()

        this.$el.querySelectorAll('[data-type="item"]').forEach(el => {
            el.classList.remove('selected')
        })
        this.$el.querySelector(`[data-id="${id}"]`).classList.add('selected')

        // console.log('this.current', this.current);
        this.inputHidden.value = this.current.value

        this.options.onSelect ? this.options.onSelect(this.current) : null

        this.close()
    }

    toggle() {
        this.isOpen ? this.close() : this.open()
    }

    open() {
        this.$el.classList.add('open')
    }

    close() {
        this.$el.classList.remove('open')
    }

    destroy() {
        this.$el.removeEventListener('click', this.clickHandler)
        this.$el.innerHTML = ''
    }

    generateArrayObjects(e) {
        const items = [...e.querySelectorAll('[data-type="item"]')]

        const arrayObjects = items.map((item,index) => {
            item.dataset.id = (index + 1).toString()
            return {
                id: item.dataset.id,
                value: item.textContent
            }
        });

        // console.log('arrayObjects', arrayObjects)
        return arrayObjects
    }

}


// Страница Каталога с товарами. Работа с селектами
new Select('#select', {
    selectedId: '1',
    onSelect(item) {
        console.log('[customSelect.js] Catalog Select 1', item)
    }
})

new Select('#catalog-select2', {
    selectedId: '1',
    onSelect(item) {
        console.log('[customSelect.js] Catalog Select 2', item)
    }
})

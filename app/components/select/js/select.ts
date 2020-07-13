import { keyCode } from 'utils/keyCode'

type SelectStateType = {
  opened: boolean
  value: boolean | string
}

type SelectParamsType = {
  name: string
  defaultValue?: string
  onChoice?: (value: string, name: string, title: string) => void
}

export interface ISelect {
  open: () => void
  close: () => void
  getValue: () => string | boolean
}

class Select implements ISelect {
  select: HTMLElement
  params: SelectParamsType
  selectButton: HTMLButtonElement
  label: HTMLElement
  valueTitle: HTMLElement
  dropdown: HTMLElement
  options: NodeListOf<HTMLElement>
  currentOption: null | HTMLElement
  focusedIndex: number
  state: SelectStateType
  labelId: string
  openDropdownClass: string
  hoverOptionClass: string
  focusOptionClass: string

  constructor(element: HTMLElement | string, params: SelectParamsType) {
    this.select =
      typeof element === 'string' ? (document.querySelector(element) as HTMLElement) : element
    this.params = params
    this.selectButton = this.select.querySelector('.select-button') as HTMLButtonElement
    this.label = this.select.querySelector('.select-label') as HTMLElement
    this.valueTitle = this.select.querySelector('.select-button__title') as HTMLElement
    this.dropdown = this.select.querySelector('.select-dropdown') as HTMLElement
    this.options = this.select.querySelectorAll('.select-item') as NodeListOf<HTMLElement>
    this.currentOption = null
    this.focusedIndex = 0
    this.state = { opened: false, value: false }
    this.labelId = `${this.params.name}-label`
    this.openDropdownClass = 'state-opened'
    this.hoverOptionClass = 'state-hovered'
    this.focusOptionClass = 'state-focused'
    this.init()
  }

  private checkOpened = (e: Event): void => {
    if (e.type === 'keydown') {
      this.checkKeyPress(e as KeyboardEvent)
      return
    }
    this.state.opened ? this.close() : this.open()
  }

  public open = (): void => {
    this.registerEvents()
    this.select.classList.add(this.openDropdownClass)
    this.dropdown.focus()
    this.state.opened = true
    this.selectButton.setAttribute('aria-expanded', 'true')
  }

  public close = (): void => {
    this.unRegisterEvents()
    this.select.classList.remove(this.openDropdownClass)
    this.unFocusedOption()
    this.state.opened = false
    this.focusedIndex = 0
    this.selectButton.setAttribute('aria-expanded', 'false')
  }

  private registerEvents = () => {
    document.dispatchEvent(new CustomEvent('openSelect', { detail: { name: this.params.name } }))
    document.addEventListener('openSelect', this.close)
    this.dropdown.addEventListener('keydown', this.checkKeyPress)
    this.dropdown.addEventListener('blur', this.close)
    this.dropdown.addEventListener('mouseleave', this.unFocusedOption)
    this.options.forEach((option) => {
      option.addEventListener('mouseenter', this.hoveredOption)
      option.addEventListener('click', this.clickedOption)
    })
  }

  private unRegisterEvents = () => {
    document.removeEventListener('openSelect', this.close)
    this.dropdown.removeEventListener('keydown', this.checkKeyPress)
    this.dropdown.removeEventListener('blur', this.close)
    this.dropdown.removeEventListener('blur', this.close)
    this.options.forEach((option) => {
      option.removeEventListener('mouseenter', this.hoveredOption)
      option.removeEventListener('click', this.clickedOption)
    })
  }

  private checkKeyPress = (e: KeyboardEvent): void => {
    var key = e.keyCode
    switch (key) {
      case keyCode.ESC:
        e.preventDefault()
        this.selectButton.focus()
        this.close()
        break
      case keyCode.PAGE_DOWN:
      case keyCode.DOWN:
        e.preventDefault()
        if (this.state.opened) {
          this.moveDown()
        } else {
          this.open()
          this.moveStart()
        }
        break
      case keyCode.PAGE_UP:
      case keyCode.UP:
        e.preventDefault()
        if (this.state.opened) {
          this.moveUp()
        } else {
          this.open()
          this.moveUp()
        }
        break
      case keyCode.HOME:
        console.log('HOME')
        this.focusedOption(this.options[0])
        break
      case keyCode.END:
        this.focusedOption(this.options[this.options.length - 1])
        break
      case keyCode.SPACE:
        this.open()
        this.moveStart()
        break
      case keyCode.ENTER:
        if (this.state.opened) {
          this.choiceOption(this.options[this.focusedIndex])
          this.close()
        } else {
          this.open()
          this.moveStart()
        }
    }
  }

  private focusedOption = (element: HTMLElement): void => {
    this.options[this.focusedIndex].removeAttribute('aria-selected')
    this.options[this.focusedIndex].classList.remove(this.hoverOptionClass)
    element.classList.add(this.hoverOptionClass)
    element.setAttribute('aria-selected', 'true')
    this.focusedIndex = Array.from(this.options).indexOf(element)
  }

  private unFocusedOption = (): void => {
    this.options[this.focusedIndex].classList.remove(this.hoverOptionClass)
  }

  private choiceOption = (element: HTMLElement): void => {
    const title = element.textContent as string
    const value = element.dataset.value as string
    this.state.value = value || title
    this.valueTitle.textContent = title
    this.currentOption && this.currentOption.classList.remove('state-active')
    this.currentOption = element
    element.classList.add('state-active')
    this.dropdown.setAttribute('aria-activedescendant', element.getAttribute('id') as string)
    if (this.params.onChoice)
      this.params.onChoice(this.state.value, this.params.name, this.valueTitle.textContent)
  }

  public getValue = () => {
    return this.state.value
  }

  private moveStart = () => {
    this.focusedOption(this.options[0])
  }

  private moveUp = (): void => {
    const position = this.focusedIndex - 1
    if (position < 0) {
      this.focusedOption(this.options[this.options.length - 1])
    } else {
      this.focusedOption(this.options[position])
    }
  }

  private moveDown = (): void => {
    const position = this.focusedIndex + 1
    if (position > this.options.length - 1) {
      this.focusedOption(this.options[0])
    } else {
      this.focusedOption(this.options[position])
    }
  }

  private hoveredOption = (e: Event) => {
    const element = e.currentTarget as HTMLElement
    this.focusedOption(element)
  }

  private clickedOption = (e: Event) => {
    this.choiceOption(e.currentTarget as HTMLElement)
  }

  private fixFocus = (e: Event): void => {
    e.preventDefault()
  }

  private setAttributes = () => {
    this.label.setAttribute('id', this.labelId)
    this.selectButton.setAttribute('aria-labelledby', this.labelId)
    this.dropdown.setAttribute('aria-labelledby', this.labelId)
    this.options.forEach((option) => {
      option.setAttribute('id', `${this.params.name}-${option.dataset.value}`)
    })
  }

  private setDefaultValue = () => {
    const element = this.dropdown.querySelector(
      `.select-item[data-value='${this.params.defaultValue}']`,
    ) as HTMLElement
    this.choiceOption(element)
  }

  private init() {
    this.selectButton.addEventListener('click', this.checkOpened)
    this.selectButton.addEventListener('keydown', this.checkOpened)
    this.select.addEventListener('mousedown', this.fixFocus)
    this.setAttributes()
    if (this.params.defaultValue) this.setDefaultValue()
  }
}

export { Select }

let oldScrollPosition = 0

const searchInnerBlock = document.querySelector('.search-section__inner') as HTMLElement
const searchBlock = document.querySelector('.search-section') as HTMLElement

const searchBlockPosition = () => {
  searchBlock.style.height = `${searchBlock.offsetHeight}px`
  let newScrollPosition = window.pageYOffset
  if (newScrollPosition > oldScrollPosition) {
    document.body.classList.remove('down-search')
  } else {
    document.body.classList.add('down-search')
  }
  oldScrollPosition = newScrollPosition <= 0 ? 0 : newScrollPosition
  if (window.pageYOffset > 400) {
    document.body.classList.add('hide-search')
    searchInnerBlock.style.position = 'fixed'
  } else {
    console.log('relative')
    document.body.classList.remove('hide-search')
    searchInnerBlock.style.position = 'relative'
  }
}

const addEventsSearchBlockPosition = () => {
  document.addEventListener('scroll', searchBlockPosition)
}

export { addEventsSearchBlockPosition }

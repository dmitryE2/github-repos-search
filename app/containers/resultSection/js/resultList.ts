import { clearNode, createElement } from 'utils/dom'
import { createRepoItem, RepoItemType } from 'components/repoItem/js/createRepoItem'

const resultList = document.querySelector('.result-list') as HTMLElement
let resultListObserver = null as any
let oldObserverItem = null as null | HTMLElement

const createResultList = (items: RepoItemType[]): void => {
  const fragment = window.document.createDocumentFragment()
  items.forEach((item: RepoItemType) => {
    let element = createRepoItem(item)
    fragment.appendChild(element)
  })
  resultList.appendChild(fragment)
  addObserverTarget()
}

const clearResultList = (): void => {
  clearNode(resultList)
}

const createScrollObserver = (callback: (entries: any, observer: any) => void): void => {
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  }
  resultListObserver = new IntersectionObserver(callback, options)
}

const addObserverTarget = (): void => {
  let target = document.querySelector('.repo-item:last-child') as HTMLElement
  if (resultListObserver) resultListObserver.observe(target)
  if (oldObserverItem) resultListObserver.unobserve(oldObserverItem)
  oldObserverItem = target
}

const createResultMessage = (message: string): void => {
  clearResultList()
  const messageBlock = createElement('div', 'result-list__message', message)
  resultList.appendChild(messageBlock)
}

const togglePreloader = () => {
  const preloader = document.querySelector('.result-section__preloader') as HTMLElement
  preloader.classList.toggle('state-visible')
}

export {
  createResultList,
  clearResultList,
  createResultMessage,
  createScrollObserver,
  addObserverTarget,
  togglePreloader,
}

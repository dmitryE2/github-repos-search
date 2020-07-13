import { createElement } from 'utils/dom'

type RepoItemType = {
  html_url: string
  name: string
  full_name: string
  description: string
  stargazers_count: string
  watchers_count: string
  language: string
  size: string
  owner: { avatar_url: string }
}

const createRepoItem = (item: RepoItemType): HTMLElement => {
  const repoItem = createElement('div', 'repo-item')
  const ava = createRepoAva(item.owner.avatar_url, item.name)
  const info = createRepoInfo(
    item.full_name,
    item.description,
    item.stargazers_count,
    item.watchers_count,
    item.size,
    item.language,
  )
  const link = createRepoLink(item.html_url)
  repoItem.appendChild(ava)
  repoItem.appendChild(info)
  repoItem.appendChild(link)
  return repoItem
}

const createRepoAva = (url: string, name: string): HTMLElement => {
  const wrapper = createElement('div', 'repo-item__avatar')
  const avatar = createElement('img', 'repo-item__avatar-image')
  avatar.setAttribute('src', url)
  avatar.setAttribute('alt', name)
  wrapper.appendChild(avatar)
  return wrapper
}

const createRepoInfo = (
  header: string,
  description: string,
  stars: string,
  watchers: string,
  size: string,
  language: string,
): HTMLElement => {
  const wrapper = createElement('div', 'repo-item__info')
  const repoHeader = createElement('h3', 'repo-item__header', header)
  repoHeader.setAttribute('title', header)
  const repoDescription = createElement(
    'p',
    'repo-item__description',
    `${description && description.slice(0, 100)}...`,
  )
  const listParams = [
    { label: 'stars: ', amount: stars },
    { label: 'watchers: ', amount: watchers },
    { label: 'size: ', amount: size },
    { label: 'language: ', amount: language },
  ]
  const repoParamsList = createParamsList(listParams)
  wrapper.appendChild(repoHeader)
  wrapper.appendChild(repoDescription)
  wrapper.appendChild(repoParamsList)
  return wrapper
}

const createParamsList = (params: any): HTMLElement => {
  const list = createElement('ul', 'repo-item__params-list')
  params.forEach((item: { label: string; amount: string }) => {
    const paramsItem = createParamsItem(item.label, item.amount)
    list.appendChild(paramsItem)
  })
  return list
}

const createParamsItem = (label: string, amount: string): HTMLElement => {
  const item = createElement('li', 'repo-item__params-item')
  if (!amount) return item
  const itemLabel = createElement('span', 'repo-item__params-label', label)
  const itemAmount = createElement('span', 'repo-item__params-amount', amount)
  item.appendChild(itemLabel)
  item.appendChild(itemAmount)
  return item
}

const createRepoLink = (url: string): HTMLElement => {
  const icoTemplate =
    '<svg height="32" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>'
  const link = createElement('a', 'repo-item__link')
  link.setAttribute('href', url)
  link.setAttribute('title', 'github page')
  link.setAttribute('rel', 'noreferrer noopener')
  link.setAttribute('target', 'blank')
  link.insertAdjacentHTML('afterbegin', icoTemplate)
  return link
}

export { createRepoItem }
export type { RepoItemType }

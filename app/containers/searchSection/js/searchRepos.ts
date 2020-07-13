import { Select, ISelect } from 'components/select/js/select'
import {
  createResultList,
  clearResultList,
  createResultMessage,
  createScrollObserver,
  togglePreloader,
} from 'containers/resultSection/js/resultList'
import { RepoItemType } from 'components/repoItem/js/createRepoItem'

type SearchReposState = {
  textValue: string
  sortValue: string
  languageValue: string
  defaultValue: boolean
  page: number
}

class SearchRepos {
  searchInput: HTMLInputElement
  sortSelect: ISelect
  languagesSelect: ISelect
  searchAmountBlock: HTMLElement
  delayCounter: number
  delayTimer: NodeJS.Timeout | null
  state: SearchReposState

  constructor() {
    this.searchInput = document.querySelector('#searchInput') as HTMLInputElement
    this.sortSelect = new Select('#sortSelect', {
      name: 'sort',
      defaultValue: 'stars-desc',
      onChoice: this.setSortValue,
    })
    this.languagesSelect = new Select('#languagesSelect', {
      name: 'languages',
      defaultValue: 'all',
      onChoice: this.setLanguageValue,
    })
    this.searchAmountBlock = document.querySelector('.search-amount') as HTMLElement
    this.delayCounter = 1000
    this.delayTimer = null
    this.state = {
      textValue: '',
      sortValue: this.sortSelect.getValue() as string,
      languageValue: this.languagesSelect.getValue() as string,
      defaultValue: true,
      page: 1,
    }
    this.init()
  }

  private setSortValue = (value: string): void => {
    this.state = { ...this.state, sortValue: value, defaultValue: false, page: 1 }
    clearResultList()
    this.setRepos()
  }

  private setLanguageValue = (value: string): void => {
    this.state = { ...this.state, languageValue: value, defaultValue: false, page: 1 }
    clearResultList()
    this.setRepos()
  }

  private setTextValue = (value: string): void => {
    this.state = { ...this.state, textValue: value, defaultValue: false, page: 1 }
    clearResultList()
    this.setRepos()
  }

  private createLoaders = () => {
    this.searchAmountBlock.classList.add('state-loading')
    togglePreloader()
  }

  private removeLoaders = () => {
    this.searchAmountBlock.classList.remove('state-loading')
    togglePreloader()
  }

  private setRepos = () => {
    this.createLoaders()
    const url = this.createLink()
    this.getRepos(url)
      .then((response: any) => {
        if (response.message) {
          this.showError(response.message)
          return false
        }
        if (parseInt(response.total_count, 10) === 0) {
          this.showError(`We couldn’t find any repositories matching "${this.state.textValue}"`)
        }
        this.createSearchAmount(response.total_count)
        createResultList(response.items as RepoItemType[])
        this.removeLoaders()
      })
      .catch((error) => {
        this.showError(error.message)
      })
  }

  private getRepos = async (url: string) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error('Oops! Something went wrong')
    return await response.json()
  }

  private getNextPage = (entries: any, observer: any) => {
    if (entries[0].isIntersecting) {
      this.state.page += 1
      this.setRepos()
    }
  }

  private createLink = (): string => {
    return `https://api.github.com/search/repositories?q=${
      this.state.textValue !== '' ? this.state.textValue : 'stars:10000..400000'
    } sort:${this.state.sortValue} language:${this.state.languageValue}&page=${
      this.state.page
    }&per_page=20`
  }

  private createSearchAmount = (amount: string): void => {
    const message = 'repository results'
    this.searchAmountBlock.textContent = `${amount} ${message}`
  }

  private showError = (message: string): void => {
    createResultMessage(message)
    this.removeLoaders()
  }

  private searchInputObserve = (e: Event): void => {
    this.delayTimer && clearTimeout(this.delayTimer)
    this.delayTimer = global.setTimeout(() => {
      const input = e.target as HTMLInputElement
      this.setTextValue(input.value)
    }, this.delayCounter)
  }

  private init = (): void => {
    this.setRepos()
    createScrollObserver(this.getNextPage)
    this.searchInput.addEventListener('input', this.searchInputObserve)
  }
}

export { SearchRepos }

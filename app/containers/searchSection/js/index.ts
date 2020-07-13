import '../styles/searchSection.scss'
import { Select } from 'components/select/js/select'

const testOnChoice = (value: string, name: string, title: string) => {
  console.log(value, name, title)
}

new Select('#sort-select', { name: 'sort', defaultValue: 'match', onChoice: testOnChoice })
new Select('#languages-select', { name: 'sort', defaultValue: 'all', onChoice: testOnChoice })

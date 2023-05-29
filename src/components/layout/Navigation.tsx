import createScrollTrigger from '~/utils/createScrollTrigger'
import { classNames } from '~/utils/tools'
import Input from '../misc/Input'
import { Icon } from 'solid-heroicons'
import { magnifyingGlass } from 'solid-heroicons/solid'
import { A } from 'solid-start'
import UserIndicator from './UserIndicator'

const Navigation = () => {
  const trigger = createScrollTrigger({ top: 50 })

  return (
    <div class={classNames(trigger() ? 'bg-neutral/70 70 backdrop-blur-sm h-12 shadow-lg ' : 'h-20', 'fixed flex justify-center inset-x-0 z-50 transition-all duration-200')}>
      <div class="px-5 md:px-10 max-w-7xl w-full items-center h-full flex transition-all duration-200">
        <div class="flex justify-between items-center w-full">
            <A href="/">
            <div>Some Logo</div>
            </A>
          <div class="flex space-x-5">
            <Input placeholder='Search' leading={<Icon path={magnifyingGlass} class="h-4 w-4" />} />
            <UserIndicator />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation

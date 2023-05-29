import { JSX } from 'solid-js'
import { classNames } from '~/utils/tools'

type Props = {
  class?: string
  placeholder?: string
  leading?: JSX.Element
  trailing?: JSX.Element
  value?: string
  name?: string
  onChange?: JSX.EventHandler<HTMLInputElement, Event>
}

const Input = (props: Props) => {
  return (
    <div class="relative">
      <div class="absolute inset-y-0 flex items-center pl-2">{props.leading}</div>
      <div>{props.trailing}</div>
      <input type="text" placeholder={props.placeholder} value={props.value || ""} oninput={props.onChange} class={classNames(props.leading != null && 'pl-8', props.trailing != null && 'pr-10', 'input input-bordered input-sm w-52')} />
    </div>
  )
}

export default Input

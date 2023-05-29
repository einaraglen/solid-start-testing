import { JSX, createSignal, onMount } from 'solid-js'
import { classNames } from '~/utils/tools'

type Props = {
  initial: string
  animate: string
  children: JSX.Element
  class?: string
  show?: boolean
}

const Transition = (props: Props) => {
  const [transition, setTransition] = createSignal(false)

  onMount(() => {
    if (props.show == null) {
      setTransition(true)
    }
  })

  return (
    <div class='relative'>
        <div class={classNames(transition() || props.show ? props.animate : props.initial, props.class || "transition-all duration-200")}>{props.children}</div>
    </div>
  ) 
}

export default Transition

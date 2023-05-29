import { Accessor, Ref, createSignal, onCleanup, onMount } from 'solid-js'

type Props = {
  top: number
}

const createScrollTrigger = ({ top }: Props) => {
  const [trigger, setTrigger] = createSignal<boolean>(false)


  const onWindowMovement = () => {
    const _trigger = window.scrollY > top;
    setTrigger(_trigger)
  }

  // Cleanup the event listener when the component is unmounted
  onCleanup(() => {
      window.removeEventListener('scroll', onWindowMovement);
      window.removeEventListener('resize', onWindowMovement);
  });

  // Attach the event listener when the component is mounted
  onMount(() => {
      window.addEventListener('scroll', onWindowMovement);
      window.addEventListener('resize', onWindowMovement);
      onWindowMovement();
  });

  return trigger;
}

export default createScrollTrigger

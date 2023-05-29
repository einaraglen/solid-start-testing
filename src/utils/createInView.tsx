import { Accessor, Ref, createSignal, onCleanup, onMount } from 'solid-js'

type CreateInViewMethods = [Accessor<boolean>, (element: HTMLDivElement) => void];

type Props = {
  top?: number
  bottom?: number
}

const createInView = (props: Props | null = null): CreateInViewMethods => {
  let ref: Ref<any>;

  const [inView, setInView] = createSignal<boolean>(false)

  const setRef = (element: HTMLDivElement) => {
    ref = element;
  }

  const onWindowMovement = () => {
    if (ref) {
      const bounds = ref.getBoundingClientRect();
      const top = (bounds.top - window.innerHeight) + (props?.top || 0)
      const bottom = window.innerHeight + ((bounds.top - window.innerHeight) + bounds.height) - (props?.bottom || 0)
      
      setInView(top < 0 && bottom > 0)
    }
  }

  // Cleanup the event listener when the component is unmounted
  onCleanup(() => {
    if (ref) {
      window.removeEventListener('scroll', onWindowMovement);
      window.removeEventListener('resize', onWindowMovement);
    }
  });

  // Attach the event listener when the component is mounted
  onMount(() => {
    if (ref) {
      window.addEventListener('scroll', onWindowMovement);
      window.addEventListener('resize', onWindowMovement);
      onWindowMovement();
    }
  });

  return [inView, setRef]
}

export default createInView

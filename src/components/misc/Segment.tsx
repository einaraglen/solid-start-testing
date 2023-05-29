import { JSX } from 'solid-js'

type Props = {
  title: string
  text?: string
  children: JSX.Element
}

const Segment = ({ title, text, children }: Props) => {
  return (
    <div class="card bg-neutral shadow-xl">
      <div class="card-body">
        <h2 class="card-title">{title}</h2>
        {text && <p>{text}</p>}
        {children}
      </div>
    </div>
  )
}

export default Segment

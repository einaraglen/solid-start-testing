type Props = {
  title: string
  text: string
}

const Heading = ({ title, text }: Props) => {
  return (
    <div>
      <h1 class="text-4xl font-bold">{title}</h1>
      <p class="py-3">{text}</p>
    </div>
  )
}

export default Heading

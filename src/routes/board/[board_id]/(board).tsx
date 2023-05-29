import { Head, Title, useParams } from "solid-start"
import Heading from "~/components/layout/Heading"

const BoardView = () => {
  const { board_id } = useParams()
  return (
    <>
     <Head>
        <Title>{board_id}</Title>
      </Head>
      <Heading title={`/${board_id}`} text="test" />
    </>
  )
}

export default BoardView

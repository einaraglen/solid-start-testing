import { Icon } from 'solid-heroicons'
import { magnifyingGlass, plus } from 'solid-heroicons/solid'
import { For, Show, createEffect, createSignal, onMount } from 'solid-js'
import { A, Head, Title, useSearchParams } from 'solid-start'
import Heading from '~/components/layout/Heading'
import Input from '~/components/misc/Input'
import Pagenation from '~/components/misc/Pagenation'
import Segment from '~/components/misc/Segment'
import { useBoardRPC } from '~/rpc/board'
import { classNames, debounce } from '~/utils/tools'

const Browse = () => {
  const [boards, fetch] = useBoardRPC().searchBoards
  const [value, setValue] = createSignal('')
  const [searchParams, setSearchParams] = useSearchParams()

  createEffect(() => {
    const search = searchParams.search
    const page = Number(searchParams.search)

    fetch({ search, page, limit: 20 })
  })

  onMount(() => {
    setValue(searchParams.search || '')
    setSearchParams({ group: 'boards', page: '1' })
  })

  const onSearch = (e: any) => {
    setValue(e.target.value)
    debounce((e: any) => setSearchParams({ search: e.target.value, page: 1 }))(e)
  }

  return (
    <>
      <Head>
        <Title>Browse!</Title>
      </Head>
      <Heading title="Browse!" text="Browse for Boards and Posts by other Users" />
      <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-2 md:space-y-0">
        <div class="tabs tabs-boxed ">
          <button class={classNames(searchParams.group == 'boards' && 'tab-active', 'tab tab-sm')} onClick={() => setSearchParams({ group: 'boards', page: 1 })}>
            Boards
          </button>
          <button class={classNames(searchParams.group == 'posts' && 'tab-active', 'tab tab-sm')} onClick={() => setSearchParams({ group: 'posts', page: 1 })}>
            Posts
          </button>
          <button class={classNames(searchParams.group == 'users' && 'tab-active', 'tab tab-sm')} onClick={() => setSearchParams({ group: 'users', page: 1 })}>
            Users
          </button>
        </div>
        <div class="flex items-center space-x-3">
          <Input placeholder={`Search ${searchParams.group}`} onChange={onSearch} leading={<Icon path={magnifyingGlass} class="h-4 w-4" />} />
          <A href="/board/create">
            <button class="btn btn-sm btn-primary gap-2">
              New Board
              <Icon path={plus} class="h-4 w-4" />
            </button>
          </A>
        </div>
      </div>
      <Show when={boards.pending}>
        <progress class="progress w-56"></progress>
      </Show>
      <Pagenation pages={50}>
        <For each={boards.result}>
          {(board) => (
            <A href={`/board/${board.name}`}>
              <Segment title={`/${board.name}`} text={board.description}>

              </Segment>
            </A>
          )}
        </For>
      </Pagenation>
    </>
  )
}

export default Browse

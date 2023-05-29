import { For, JSX, createEffect, createMemo, createSignal } from 'solid-js'
import { useSearchParams } from 'solid-start'
import { classNames } from '~/utils/tools'

type Props = {
  pages: number
  children: JSX.Element
}

const Pagenation = ({ pages, children }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = createSignal<number | null>(null)

  createEffect(() => {
    if (!isNaN(Number(searchParams.page))) {
      setPage(Number(searchParams.page))
    }
  })

  const left = createMemo(() => {
    if (pages <= 5) {
      return Array.from({ length: pages }, (_, index) => index + 1)
    }

    const current = page() || 1

    if (current == 1) {
      return [current, current + 1, current + 2]
    }

    if (current == 2) {
      return [current - 1, current, current + 1]
    }

    if (current >= pages - 2) {
        return [1, 2 , 3]
    }

    return [current - 1, current, current + 1]
  })

  const right = createMemo(() => {
    if (pages <= 5) {
      return undefined
    }

    return [pages - 2, pages - 1, pages]
  })

  const navigateEnd = () => {
    setSearchParams({ page: pages })
  }

  const navigateStart = () => {
    setSearchParams({ page: 1 })
  }

  return (
    <div class="flex flex-col flex-grow h-[80vh]">
      <div class="flex flex-col flex-grow space-y-10">{children}</div>
      <div class="w-full flex items-center justify-center">
        <div class="btn-group">
          <button class={classNames(page() == 1 && 'btn-disabled', 'btn btn-sm w-8')} onClick={navigateStart}>
            «
          </button>
          <For each={left()}>
            {(_page) => (
              <button class={classNames(page() == _page && "btn-active", 'btn btn-sm w-8')} onClick={() => setSearchParams({ page: _page }, { scroll: true })}>
                {_page}
              </button>
            )}
          </For>
          {right() && <button class="btn btn-sm btn-disabled w-8">...</button>}
          <For each={right()}>
            {(_page) => (
              <button class={classNames(page() == _page && "btn-active", 'btn btn-sm w-8')} onClick={() => setSearchParams({ page: _page }, { scroll: true })}>
                {_page}
              </button>
            )}
          </For>
          <button class={classNames(page() == pages && 'btn-disabled', 'btn btn-sm w-8')} onClick={navigateEnd}>
            »
          </button>
        </div>
      </div>
    </div>
  )
}

export default Pagenation

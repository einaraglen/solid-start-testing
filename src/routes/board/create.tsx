import { createSignal } from 'solid-js'
import { Head, Title } from 'solid-start'
import Heading from '~/components/layout/Heading'
import { classNames } from '~/utils/tools'
import { useNavigate } from 'solid-start'
import { useBoardRPC } from '~/rpc/board'

const CreateBoard = () => {
  const [form, setForm] = createSignal({ name: '', description: '' })
  const navigate = useNavigate()
  const [state, submit] = useBoardRPC().createBoard

  const onSubmit = () => {
    submit(form()).then((data) => navigate(`/board/${data.name}`))
  }

  return (
    <>
      <Head>
        <Title>Create Board!</Title>
      </Head>
      <Heading title="Create Board!" text="Boards are collections for related Posts!" />
      <div class="flex items-center space-x-3">
        <div class="form-control w-full">
          <label class="label">
            <span class="label-text">Name</span>
          </label>
          <label class="input-group">
            <span>/</span>
            <input
              value={form().name}
              oninput={(e: any) => setForm((f) => ({ ...f, name: e.target.value }))}
              type="text"
              placeholder="How should the board be found?"
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <div class="flex space-x-3 items-end w-full">
          <div class="form-control w-full">
            <label class="label">
              <span class="label-text">Tags</span>
            </label>
            <label class="input-group">
              <span>#</span>
              <input type="text" placeholder="Helpful for discovery" class="input input-bordered w-full" />
            </label>
          </div>
          <button class="btn">Add</button>
        </div>
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">Description</span>
          <span class="label-text-alt">Max 196 Characters</span>
        </label>
        <textarea
          value={form().description}
          oninput={(e: any) => setForm((f) => ({ ...f, description: e.target.value }))}
          class="textarea textarea-md textarea-bordered h-24"
          placeholder="Tell us what this board is all about!"
        ></textarea>
      </div>
      <div class="w-full flex justify-end">
        <div class="flex space-x-3">
          <button class={classNames(state.pending && 'btn-disabled', 'btn')} onclick={() => window.history.back()}>
            Cancel
          </button>
          <button class={classNames(state.pending && 'loading', 'btn btn-primary')} onClick={onSubmit}>
            Create
          </button>
        </div>
      </div>
    </>
  )
}

export default CreateBoard

import { Accessor, createSignal } from 'solid-js'

export type HandlerState<T> = {
  pending: boolean
  error: any | null
  data: T | null
}

type CreateRPCHandler<T> = [Accessor<HandlerState<T>>, (promise: Promise<T>) => Promise<T>]

export const createRPCHanlder = <T,>(): CreateRPCHandler<T> => {
  const initial = { pending: false, error: null, data: null }
  const [state, setState] = createSignal<HandlerState<T>>(initial)

  const handler = (promise: Promise<T>) => {
    setState({ ...initial, pending: true })
    return promise
      .then((data: any) => {
        setState({ pending: false, data, error: null })
        return data
      })
      .catch((error) => setState({ pending: false, data: null, error }))
  }

  return [state, handler]
}
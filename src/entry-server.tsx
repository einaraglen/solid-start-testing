import { createSignal } from "solid-js";
import {
  StartServer,
  createHandler,
  renderAsync,
} from "solid-start/entry-server";

export const [payload, setPayload] = createSignal("Test 1")

export default createHandler(
  ({ forward }) => {
    // TODO: send auth token to client for CSR data fetching!
    return async event => {
      // your own logic here
      const request = event.request;
      // console.log(request.headers)
      setPayload("Test 2")
      // maybe you want to get the cookie? or block this ip?
      return forward(event); // next
    };
  },
  renderAsync((event) => <StartServer event={event} />)
);

import { signIn } from "@solid-auth/next/client"
import { Icon } from "solid-heroicons"
import { arrowLeftOnRectangle } from "solid-heroicons/solid"

const LoginAvatar = () => {
    return (
      <button onclick={() => signIn("github")} class="avatar placeholder">
        <div class="bg-primary text-neutral-content rounded-full w-8">
          <span class="text-xs">
            <Icon path={arrowLeftOnRectangle} class="h-4 w-4" />
          </span>
        </div>
      </button>
    )
  }

  
  export default LoginAvatar
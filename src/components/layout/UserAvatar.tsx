import { signOut } from "@solid-auth/next/client";
import { Icon } from "solid-heroicons";
import { arrowRightOnRectangle, user } from "solid-heroicons/solid";
import Avatar from "../misc/Avatar";
import { A } from "solid-start";
import { Session } from "@auth/core";

const UserAvatar = ({ session }: { session: Session }) => {
    return (
      <div class="dropdown dropdown-end">
        <button tabindex="0">
          <Avatar username={session.user?.email!} />
        </button>
        <ul tabindex="0" class="dropdown-content mt-3 menu bg-base-100 shadow-lg w-36 p-2 rounded-box">
          <li>
            <A href="/profile">
              <Icon path={user} class="h-4 w-4" />
              Profile
            </A>
          </li>
          <li onclick={() => signOut()}>
            <a>
            <Icon path={arrowRightOnRectangle} class="h-4 w-4" />
            Logout
            </a>
          </li>
        </ul>
      </div>
    )
  }

  export default UserAvatar;
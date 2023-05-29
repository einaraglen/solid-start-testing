type Props = {
  username: string
}

const Avatar = ({ username }: Props) => {
  const getInitials = () => {
    let initials = ''
    try {
      const prefix = username.split('@')[0]
      const [first, last] = prefix.split('.')
      initials = last == null ? first[0] + first[1] : first[0] + last[0]
    } catch (err: any) {
      console.warn('Failed to get initials', err)
      initials = 'ERR'
    } finally {
      return initials.toUpperCase()
    }
  }

  return (
    <div class="avatar placeholder">
      <div class="bg-neutral-focus text-neutral-content rounded-full w-8">
        <span class="text-xs">{getInitials()}</span>
      </div>
    </div>
  )
}

export default Avatar

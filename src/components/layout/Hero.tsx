import { A } from 'solid-start'

const Hero = () => {
  return (
    <div class="py-10">
      <h1 class="text-7xl font-bold">Hacker News!</h1>
      <p class="py-6 text-lg">Read and write whatever is on your mind, and share with others.</p>
      <A href="/browse">
        <button class="btn btn-primary">Get Started</button>
      </A>
    </div>
  )
}

export default Hero

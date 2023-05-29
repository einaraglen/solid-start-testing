// @refresh reload
import { Suspense } from 'solid-js'
import * as Solid from 'solid-start'
import './root.css'
import Navigation from './components/layout/Navigation'
import Footer from './components/layout/Footer'

const Root = () => {
  return (
    <Solid.Html lang="en">
      <Solid.Head>
        <Solid.Title>Hacker News!</Solid.Title>
        <Solid.Meta charset="utf-8" />
        <Solid.Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Solid.Head>
      <Solid.Body>
        <Suspense>
          <Solid.ErrorBoundary>
            <main class="flex flex-col items-center relative min-h-screen">
              <Navigation />
              <div class="absolute -z-10 svg-pattern inset-0 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"></div>
              <div class="max-w-7xl w-full flex flex-col md:px-10 px-5 py-10 pt-36 space-y-10">
                <Solid.Routes>
                  <Solid.FileRoutes />
                </Solid.Routes>
              </div>
            </main>
            <Footer />
          </Solid.ErrorBoundary>
        </Suspense>
        <Solid.Scripts />
      </Solid.Body>
    </Solid.Html>
  )
}

export default Root

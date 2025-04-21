import { HeaderController } from '@/Header'

export function NotFound() {
  return (
    <div className='max-w-screen h-screen bg-eggshell'>
      <header>
        <HeaderController />
      </header>
      <main>
        <h1>404</h1>
        <p>Not Found</p>
      </main>
    </div>
  )
}
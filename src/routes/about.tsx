import { createFileRoute } from '@tanstack/react-router'
// import React, { useState } from 'react'
import { HeaderController } from '@/Header'
import '../global.css'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
    return (
      <div className='bg-eggshell max-w-screen h-full'>
        <header>
          <HeaderController />
        </header>
        <main className='text-5xl text-onyx pt-50'>
          About
        </main>
      </div>
    )
}
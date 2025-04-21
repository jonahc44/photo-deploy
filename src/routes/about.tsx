import { createFileRoute } from '@tanstack/react-router'
// import React, { useState } from 'react'
import { HeaderController } from '@/Header'
import { Footer } from '@/Footer'
import '../global.css'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
    return (
      <div className='bg-eggshell max-w-screen h-full min-h-screen flex flex-col'>
        <header>
          <HeaderController />
        </header>
        <main className='text-3xl text-onyx pt-40 flex flex-col flex-grow items-center'>
          <h1 className='text-7xl pb-10'>About</h1>
          <p className='p-12'>Tommy is a photographer based out of Chicago, IL.</p>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    )
}
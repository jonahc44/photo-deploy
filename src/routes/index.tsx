import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { Footer } from '@/Footer';
import { HeaderController } from '@/Header';
import '../global.css'

export const Route = createFileRoute('/')({
  component: Index,
})

const fetchPhotos = async () => {
  const response = await fetch('https://photo-website-d5g7.onrender.com/photos');
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
}

const Photos = () => {
  const { status, data: photos, error } = useQuery({
    queryKey: ['photos'],
    queryFn: fetchPhotos
  })

  if (status === 'pending') {
    return <div>Loading...</div>
  }

  if (status === 'error') {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className="grid gap-14 justify-items-center h-full w-5/6 auto-rows-min last:pb-20">
      {photos.map((url: string, index: string) => (
        <a key={index} href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} alt={`Image ${index + 1}`} loading='lazy' className="max-h-screen" />
        </a>
      ))}
    </div>
  );
}

const IndexMain: React.FC = () => {
  const photos = Photos();
  
  return (
    <div className="grid gap-14 justify-items-center h-full max-w-fit auto-rows-min last:pb-20 min-h-screen">
      <h1 className='w-screen text-4xl sm:text-5xl text-onyx p-10 pt-45 grid justify-center'>
        Recent Photos
      </h1>
      {photos}
    </div>
  )
}

function Index() {
  return (
    <div className='bg-eggshell max-w-screen'>
      <header>
        <HeaderController />
      </header>
      <main id='main'>
        <IndexMain />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}
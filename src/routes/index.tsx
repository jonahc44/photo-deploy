import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { HeaderController } from '@/Header';
import '../global.css'

export const Route = createFileRoute('/')({
  component: Index,
})

library.add(faInstagram);

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

const IndexFooter: React.FC = () => {
  return (
    <div className='flex justify-around items-center w-screen h-20 bg-onyx align-center text-eggshell text-xl sm:text-2xl'>
      <p className='pl-4 w-fit'>&copy; {new Date().getFullYear()} Tommy Gillis</p>
      <a href='https://www.instagram.com/strato.stella?igsh=M3Bsc200Nm5nc2hw' className='pl-10 sm:pl-25 md:pl-55 lg:pl-110 xl:pl-170 hover:text-white' aria-label="Visit my Instagram page">
        <FontAwesomeIcon icon={faInstagram} size='xl' />
      </a>
      <a href='mailto:humdjg@gmail.com' className='hover:text-white' aria-label='Email me'>Contact Me</a>
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
        <IndexFooter />
      </footer>
    </div>
  )
}
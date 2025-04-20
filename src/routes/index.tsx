import { createFileRoute } from '@tanstack/react-router'
import { useQuery } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faInstagram } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../global.css'

export const Route = createFileRoute('/')({
  component: Index,
})

library.add(faInstagram);

interface HeaderProps {
  handleClick: () => void;
  handleScroll: () => void;
  isHidden: boolean;
  isClicked: boolean;
}

const HeaderController: React.FC = () => {
  // For clicking on menu
  const [isHeaderHidden, setIsHeaderHidden] = useState<boolean>(false);
  const [isButtonHidden, setIsButtonHidden] = useState<boolean>(true);
  const [isButtonClicked, setIsButtonClicked] = useState<boolean>(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleClick = () => {
    setIsHeaderHidden((prev) => !prev);
    setIsButtonHidden((prev) => !prev);
    setIsButtonClicked((prev) => !prev);
    setLastScrollTop(0);
  };

  const handleScroll = () => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScrollTop > lastScrollTop) {
      // User is scrolling down
      setIsButtonHidden(false);
    } else {
      // User is scrolling up
      setIsButtonHidden(true);
    }

    setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div>
      <IndexHeader handleClick={handleClick} handleScroll={handleScroll} isHidden={isButtonHidden} isClicked={isButtonClicked} />
      <IndexHeaderMenu handleClick={handleClick} handleScroll={handleScroll} isHidden={isHeaderHidden} isClicked={isButtonClicked} />
    </div>
  );
}

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

const OpenMenu: React.FC<HeaderProps> = ({handleClick, isHidden, isClicked}: HeaderProps) => {
  return (
    <button onClick={handleClick} className='text-eggshell'>
      <svg xmlns="http://www.w3.org/2000/svg" stroke='currentColor' viewBox='0 0 40 26' className={`w-24 h-min text-eggshell z-6 hover:text-white hover:cursor-pointer focus:text-white transition-transform duration-350 delay-100 ease-in-out ${
        isHidden ? (isClicked ? 'invisible' : '' ) : (isClicked ? 'invisible' : 'translate-y-[-140px]')}`}>
          <path d="M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 
          0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z">
          </path>
      </svg>
    </button>
  )
} 

const IndexHeaderMenu: React.FC<HeaderProps> = ({handleClick, isHidden}: HeaderProps) => {
  return (
    <div className={`fixed top-0 left-0 right-0 z-10 w-full h-min row-start-1 grid grid-cols-3 auto-rows-min gap-8 justify-items-center bg-onyx text-eggshell text-5xl p-20 transition-all duration-600 ease-in-out ${
      isHidden ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <button onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" strokeWidth={2} stroke="currentColor" className="w-6 h-6 hover:text-white hover:cursor-pointer fixed right-12 top-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2 22 22 2M2 2l20 20" />
        </svg>
      </button>
      <a href="/photo-deploy/" className={`hover:text-white hover:cursor-pointer h-min col-start-2 col-2`}>Home</a>
      <a href="/photo-deploy/about" className={`hover:text-white hover:cursor-pointer h-min col-start-2 col-2`}>About</a>
    </div>
  )
}

const IndexHeader: React.FC<HeaderProps> = ({handleClick, handleScroll, isHidden, isClicked}: HeaderProps) => {
  return (
    <div className={`fixed z-4 flex justify-between items-center w-screen h-32 bg-onyx text-eggshell transition-transform duration-350 delay-100 ease-in-out ${
      isHidden ? (isClicked ? 'invisible' : '' ) : (isClicked ? 'invisible' : 'translate-y-[-140px]')}`} >
        <a href='/photo-deploy/' className='text-4xl z-5 w-fit pl-10 hover:text-white'>Tommy Gillis</a>
        <OpenMenu handleClick={handleClick} handleScroll={handleScroll} isHidden={isHidden} isClicked={isClicked}/>
    </div>
  )
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
      <a href='https://www.instagram.com/strato.stella?igsh=M3Bsc200Nm5nc2hw' className='pl-15 sm:pl-25 md:pl-55 lg:pl-110 xl:pl-170 hover:text-white'>
        <FontAwesomeIcon icon={faInstagram} size='xl' />
      </a>
      <a href='mailto:humdjg@gmail.com' className='hover:text-white'>Contact Me</a>
    </div>
  )
}

function Index() {
  return (
    <div className='bg-eggshell max-w-screen'>
      <header>
        <HeaderController />
      </header>
      <main>
        <IndexMain />
      </main>
      <footer>
        <IndexFooter />
      </footer>
    </div>
  )
}
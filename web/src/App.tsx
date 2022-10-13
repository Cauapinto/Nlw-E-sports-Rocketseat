
import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdBanner } from './components/CreateAdBanner';
import './styles/main.css';
'phosphor-react'
import { GameBanner } from './components/GameBanner';

import logoImg from './assets/logo-nlw-esports.svg'

import { CreateAdModal } from './components/createAdModal';
import axios from 'axios';


interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count: {
    Ads: number;
  }
}

function App() {

  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
     .then(response => {
      setGames(response.data)
     })
  }, [])


  return (
    <div className='max-w-[1344px] mx-auto flex flex-col items-center my-20'>
      <img src={logoImg} alt="" />

      <h1 className='text-6xl text-white font-black mt-3'>Seu <span className='text-transparent bg-nlw-gradient bg-clip-text'>duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {games.map(game => {
          return (
            <GameBanner
            key={game.id}
            title={game.title} 
            bannerUrl={game.bannerUrl}  
            adsCount={game._count.Ads}
            />
          )
        })}
      </div>

      <Dialog.Root>
        <CreateAdBanner/>
        <CreateAdModal/>
      </Dialog.Root>
    </div>
  )
}

export default App

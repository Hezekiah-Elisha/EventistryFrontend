import React from 'react'
import Hero from '../components/Hero'
import Card from '../components/Card'
import guitar from "../assets/guitar.jpg";


export default function HomePage() {
  return (
    <div>
      <Hero />
      <div className='px-52 flex flex-col gap-2 py-10'>
        <h2 className='text-4xl font-bold text-primary'>Featured Products</h2>
        <div className='flex flex-row flex-wrap w-full justify-around'>
          <Card title="Guitar" description={'A very nice guitar'} price={500} location={'Nairobi'} image={guitar} hot={true} />
          <Card title="Guitar" description={'A very nice guitar'} price={500} location={'Nairobi'} image={guitar} hot={true} />
          <Card title="Guitar" description={'A very nice guitar'} price={500} location={'Nairobi'} image={guitar} hot={true} />
        </div>
      </div>
    </div>
  )
}

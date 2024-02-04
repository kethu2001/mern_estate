import React from 'react'

export default function About() {
  return (
    <main className='py-20 px-4 max-w-6xl mx-auto'>
      <h1 className='text-3xl font-bold mb-4 text-slate-800'>About Dream Estate</h1>

      <div className='flex flex-col sm:flex-row gap-6'>

        <div className='flex flex-col gap-6 flex-1'>
          <p className='mb-4 text-slate-700'>Sahand Estate is a leading real estate agency that specializes in helping clients buy, sell, and rent properties in the most desirable neighborhoods. Our team of experienced agents is dedicated to providing exceptional service and making the buying and selling process as smooth as possible.</p>
          <p className='mb-4 text-slate-700'>
            Our mission is to help our clients achieve their real estate goals by providing expert advice, personalized service, and a deep understanding of the local market. Whether you are looking to buy, sell, or rent a property, we are here to help you every step of the way.
          </p>
          <p className='mb-4 text-slate-700'>Our team of agents has a wealth of experience and knowledge in the real estate industry, and we are committed to providing the highest level of service to our clients. We believe that buying or selling a property should be an exciting and rewarding experience, and we are dedicated to making that a reality for each and every one of our clients.</p>
        </div>

        <div className='flex flex-col gap-6 flex-1'>
          {/* <div className="flex flex-wrap items-center justify-center p-10">
            <div className="flex gap-3 circle-image border rounded-full overflow-hidden w-25 h-200 mx-auto shadow-md">
              <img
                src="https://s3.ap-southeast-1.amazonaws.com/propnex-xserver-img/pnimgs/fileservice/1000028/hq-meta/2106/1000028-hq-meta-1623409088-sell-confident.jpg"
                alt="Beautiful picture"
                style={{ maxWidth: '100%', maxHeight: '100%' }}
              />
            </div>
          </div> */}

          <div className="h-auto max-w-full rounded-full">

            <img
                src="https://s3.ap-southeast-1.amazonaws.com/propnex-xserver-img/pnimgs/fileservice/1000028/hq-meta/2106/1000028-hq-meta-1623409088-sell-confident.jpg"
                alt="Beautiful picture"
                className='w-auto max-h-full rounded-full shadow-md'
              />
              
          </div>
        </div>

      </div>
    </main>
  )
}

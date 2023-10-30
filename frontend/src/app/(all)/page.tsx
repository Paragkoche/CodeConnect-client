import Image from 'next/image'
import Link from 'next/link'
import H1 from "@/static/img/home-hero-blogs.png"
import H2 from "@/static/img/home-hero-compete.png";
import H3 from "@/static/img/home-hero-learn.png";
import H4 from "@/static/img/home-hero-practice.png"

const json = [
  {
    id: 1, title: <div className='bg-white text-xl font-bold cursor-pointer rounded-lg p-4 shadow-lg flex items-center'>My Registration</div>,
    content: <p className='bg-purple-950 flex space-x-16 items-center py-5'><Image alt='s' src={require('../../static/img/top10lan.jpg')} className='flex h-40 w-25'></Image>
      <Image alt="s" src={require('../../static/img/programming evolution.jpg')} className='flex h-40 w-25' />
      <Image alt='s' src={require('../../static/img/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo-removebg-preview (1).png')} className='flex h-40 w-25'></Image>
    </p>,
    show: true
  },
  {
    id: 2, title: <div className='bg-white text-xl font-bold cursor-pointer rounded-lg p-4 shadow-lg flex items-center'>My watchlist</div>,
    content: <p className='bg-purple-950 flex space-x-16 items-center py-5'><Image alt='s' src={require('../../static/img/top10lan.jpg')} className='flex h-40 w-25'></Image>
      <Image alt='s' src={require('../../static/img/programming evolution.jpg')} className='flex h-40 w-25'></Image>
      <Image alt='s' src={require('../../static/img/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo-removebg-preview (1).png')} className='flex h-40 w-25'></Image>
    </p>,
    show: false
  },
  {
    id: 3, title: <div className='bg-white text-xl font-bold cursor-pointer rounded-lg p-4 shadow-lg flex items-center'>Recently Viewed</div>,
    content: <p className='bg-purple-950 flex space-x-16 items-center py-5'><Image alt='s' src={require('../../static/img/top10lan.jpg')} className='flex h-40 w-25'></Image>
      <Image alt='s' src={require('../../static/img/programming evolution.jpg')} className='flex h-40 w-25'></Image>
      <Image alt='s' src={require('../../static/img/png-clipart-c-programming-language-logo-microsoft-visual-studio-net-framework-javascript-icon-purple-logo-removebg-preview (1).png')} className='flex h-40 w-25'></Image>
    </p>,
    show: false
  },
]

export default function Home() {
  return (
    <><div className="bg-purple-950 text-white p-8 flex flex-wrap justify-center">
      <div className="text-left w-1/2 p-24">
        <h1 className="text-4xl font-bold">
          <pre className="">
            Connecting Teachers, Students,
            <span className="border-b border-white">Programming</span>
          </pre>
        </h1>
        <p className="mt-4 text-xl text-gray-300">
          Explore the code across various topics using different languages, gain coding skills, and stand out in the crowd.
        </p>
      </div>

      <div className="w-1/2 p-20">
        <div className="flex flex-wrap justify-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={H1}
              alt="Image 1"
              className="w-full h-full object-cover rounded-lg mr-3" />
            <div className="absolute top-0 left-0 text-black text-bold p-2">
              Assignments
            </div>
          </div>

          <div className="relative w-32 h-32 mb-4">
            <Image
              src={H2}
              alt="Image 1"
              className="w-full h-full object-cover rounded-lg ml-3" />
            <div className="absolute top-0 left-0 text-black text-bold p-2 ml-3">
              Compete
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-center">
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={H3}
              alt="Image 1"
              className="w-full h-full object-cover rounded-lg mr-3" />
            <div className="absolute top-0 left-0 text-black text-bold p-2">
              <Link href='/landing'>Practice</Link>
            </div>
          </div>
          <div className="relative w-32 h-32 mb-4">
            <Image
              src={H3}
              alt="Image 1"
              className="w-full h-full object-cover rounded-lg ml-3" />
            <div className="absolute top-0 left-0 text-black text-bold p-2 ml-3">
              Learn
            </div>
          </div>
        </div>
      </div>
    </div>
      <div className='bg-purple-950 flex justify-center p-10'>
        <div className='flex space-x-16 '>
          {json.map((section) => (
            <div key={section.id} className="p-2 cursor-pointer ${setSection === section.id ? 'bg-yellow-300' : ''}">
              <button >{section.title}</button>
              {section.show && <p>{section.content}</p>}
            </div>
          ))}
        </div>
      </div></>
  )
}

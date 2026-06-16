import {reels, reviews} from './components/maps.tsx'

function App() {

  return (
    <div>
      <div className="evnH">
        <h1 className='hDng'>
          Evnin <br />Agency
        <div className="degnE"><img src="/evnin.webp" alt="ev-logo" /></div>
        </h1>
        <div className="reviews w-full">
          <div className='maRq'>
            {reviews.map(review => 
            <div className='block whitespace-break-spaces mx-1 text-[.7em] px-4 rounded-md border border-zinc-800 font-1 shadow-2xl text-left w-50' key={review.id}>
              <div className="nM -mb-1 pt-1 text-[.7em] flex items-center">{review.name} ✦ <span className='inline-block ml-1'>{review.company}</span></div>
              <div className="rV pb-2 text-white">{review.content}</div>
            </div>  
            )}
          </div>
        </div>
        <div className="reels">
          <div className="grid grid-cols-3 gap-4 w-150">
            {reels.map(reel => <div key={reel.id}><video src={reel.src} autoPlay muted className='rounded-md' loop></video></div>)}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
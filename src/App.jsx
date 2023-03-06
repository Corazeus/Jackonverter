import { useRef, useState } from 'react'
import { youtube_parser } from './utils';
import axios from 'axios'

function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);

  const handleSubmit = (e) => {

    e.preventDefault();

    const youtubeID = youtube_parser(inputUrlRef.current.value);

    console.log(inputUrlRef.current.value);
    console.log("Video ID: "+youtubeID);

    const options = {
      method: 'GET',
      url: 'https://youtube-mp36.p.rapidapi.com/dl',

      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAID_API_KEY,
        'X-RapidAPI-Host': 'youtube-mp36.p.rapidapi.com'
      },

      params: {
        id: youtubeID
      }

    }

    axios(options)
    .then(res => setUrlResult(res.data.link))
    .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="App">

      <span className='logo'> jackonverter </span>

      <section className='content'>

        <h1 className='content_title'>Youtube to MP3 Converter</h1>

        <p className="content_description">

          Convert Youtube videos into MP3 for your music needs!

        </p>

        <form onSubmit={handleSubmit} className='form'>

          <input ref={inputUrlRef} placeholder='Paste your Youtube video URL here...' type='text' className='form_input'/>
          <button type='submit' className='form_button'>Search</button>

        </form>

        {urlResult ? <a href={urlResult} target='_blank' rel='noreferrer' className='download_btn'> Download MP3</a> : ''}

      </section>

    </div>
  )
}

export default App

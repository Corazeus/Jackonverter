import { useRef, useState } from 'react'
import { youtube_parser } from './utils';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  const inputUrlRef = useRef();
  const [urlResult, setUrlResult] = useState(null);
  const [embedID, setEmbedID] = useState(null);

  const handleSubmit = (e) => {

    e.preventDefault();

    const youtubeID = youtube_parser(inputUrlRef.current.value);

    console.log(inputUrlRef.current.value);
    console.log("Video ID: " + youtubeID);

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
      .then(res => setUrlResult(res.data.link), setEmbedID(youtubeID))
      .catch(err => console.log(err))

    inputUrlRef.current.value = '';

  }

  return (
    <div className="App">

      <span className='logo' data-text="JACKONVERTER">JACKONVERTER</span>

      <section className='content'>

        <h1 className='content_title'>Youtube to MP3 Converter</h1>

        <p className="content_description">

          Convert Youtube videos into MP3 for your music needs!

        </p>

        <form onSubmit={handleSubmit} className='form'>

          <input ref={inputUrlRef} placeholder='Paste your Youtube video URL here...' type='text' className='form_input' />
          <button type='submit' className='form_button'>Search</button>

        </form>

        <br></br>

        {urlResult ?
          <Container>
            <div className='video-container'>
              <h4 className='youtube-video-title'>Youtube Video</h4>
              <iframe src={`https://www.youtube.com/embed/${embedID}`} title='Youtube Video' allowFullScreen></iframe>
            </div>
          </Container> : ''}
        <div>
          {urlResult ?

            <button className='button-3'>
              <a href={urlResult} target='_blank' rel='noreferrer' className='download_btn'> Download MP3</a>
            </button>

            : ''}

          {urlResult ?

            <button className='button-3' onClick={() => window.location.reload(true)}>
              <a href="" target='_blank' rel='noreferrer' className='download_btn'> Convert Next</a>
            </button>

            : ''}
        </div>

        <br></br>

        {urlResult ?
          <p className='instructions'> To download click the Download MP3 button and to convert another video click the Convert Next button, or you can just paste a new URL and click the Search button.</p>
          : ''}

      </section>

    </div>
  )
}

export default App

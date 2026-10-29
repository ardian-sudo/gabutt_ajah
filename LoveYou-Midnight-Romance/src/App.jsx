import { useEffect, useMemo, useRef, useState } from 'react'
import { Heart, Music2, Volume2, VolumeX, Sparkles, MailOpen, RotateCcw, ArrowDown, Stars, MoonStar, X } from 'lucide-react'

/*
  PERSONALIZE DI SINI:
  - partnerName: nama pasangan
  - senderName: namamu / nama panggilan
  - intro: kalimat pembuka
  - letter: isi surat cinta
  - finalMessage: pesan kejutan terakhir
  - specialDate: tanggal spesial (opsional, format YYYY-MM-DD)
  - musicUrl: URL langsung ke file audio .mp3/.ogg (opsional)
*/
const LOVE_CONFIG = {
  partnerName: 'My Favorite Person',
  senderName: 'Someone who loves you',
  intro: 'I made a little universe, just for you.',
  letter: `Hai, kamu. ♡

Kalau suatu hari dunia terasa terlalu ramai, semoga halaman kecil ini bisa jadi tempat yang tenang buat kamu.

Terima kasih sudah hadir dan membuat hal-hal sederhana terasa istimewa. Aku mungkin tidak selalu pandai menyampaikan semuanya lewat kata-kata, tapi aku ingin terus belajar menunjukkan betapa berharganya kamu.

Semoga kamu selalu punya alasan untuk tersenyum, tempat untuk pulang, dan seseorang yang mendengarkan ceritamu.

Dan kalau kamu lupa hari ini, biar aku ingatkan sekali lagi: kamu itu berharga, lebih dari yang bisa dijelaskan oleh satu surat kecil ini.`,
  finalMessage: 'If I could make one wish, it would be to keep making beautiful little memories with you. ♡',
  specialDate: '',
  musicUrl: '',
  musicLabel: 'our little soundtrack'
}

const STAR_COUNT = 75
const HEARTS = ['♡', '♥', '✦', '✧']

function makeStars() {
  return Array.from({ length: STAR_COUNT }, (_, i) => ({
    id: i,
    x: `${(i * 47 + 13) % 100}%`,
    y: `${(i * 31 + 5) % 100}%`,
    delay: `${-((i * 0.37) % 5)}s`,
    duration: `${2.2 + ((i * 17) % 28) / 10}s`,
    size: `${2 + ((i * 7) % 3)}px`
  }))
}

function StarField() {
  const stars = useMemo(makeStars, [])
  return <div className="starfield" aria-hidden="true">
    {stars.map(star => <span key={star.id} className="star" style={{
      left: star.x, top: star.y, width: star.size, height: star.size,
      animationDelay: star.delay, animationDuration: star.duration
    }} />)}
    <div className="nebula nebula-one" />
    <div className="nebula nebula-two" />
  </div>
}

function FloatingHearts({ burst = false }) {
  const items = useMemo(() => Array.from({ length: burst ? 26 : 12 }, (_, i) => ({
    id: i,
    left: `${(i * 37 + 8) % 100}%`,
    delay: `${-((i * 1.3) % 12)}s`,
    duration: `${9 + ((i * 11) % 10)}s`,
    size: `${12 + ((i * 5) % 17)}px`,
    drift: `${(i % 2 ? 1 : -1) * (15 + (i % 5) * 9)}px`
  })), [burst])
  return <div className={`floating-hearts ${burst ? 'burst' : ''}`} aria-hidden="true">
    {items.map(item => <span key={item.id} style={{
      left: item.left, animationDelay: item.delay, animationDuration: item.duration,
      fontSize: item.size, '--drift': item.drift
    }}>{HEARTS[item.id % HEARTS.length]}</span>)}
  </div>
}

function Envelope({ onOpen, opened }) {
  return <button className={`envelope-button ${opened ? 'is-open' : ''}`} onClick={onOpen} aria-label={opened ? 'Surat sudah terbuka' : 'Buka surat cinta'}>
    <div className="envelope-glow" />
    <div className="envelope">
      <div className="envelope-back" />
      <div className="letter-paper"><span>for you, always</span><Heart size={22} fill="currentColor" /></div>
      <div className="envelope-front" />
      <div className="envelope-flap" />
      <div className="envelope-seal"><Heart size={20} fill="currentColor" /></div>
    </div>
    <span className="envelope-caption">{opened ? 'a little letter, just for you' : 'tap to open your letter'}</span>
  </button>
}

function getDays(date) {
  if (!date) return null
  const start = new Date(`${date}T00:00:00`)
  if (Number.isNaN(start.getTime())) return null
  const today = new Date()
  const now = new Date(today.getFullYear(), today.getMonth(), today.getDate())
  return Math.floor((now - start) / 86400000)
}

export default function App() {
  const [opened, setOpened] = useState(false)
  const [finale, setFinale] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [musicError, setMusicError] = useState('')
  const [showLetter, setShowLetter] = useState(true)
  const audioRef = useRef(null)
  const days = getDays(LOVE_CONFIG.specialDate)

  useEffect(() => {
    if (opened && LOVE_CONFIG.musicUrl && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {
        setPlaying(false)
        setMusicError('Tekan tombol musik untuk mulai memutar lagu.')
      })
    }
  }, [opened])

  const toggleMusic = async () => {
    if (!LOVE_CONFIG.musicUrl) {
      setMusicError('Tambahkan URL audio di LOVE_CONFIG pada src/App.jsx untuk mengaktifkan musik.')
      return
    }
    setMusicError('')
    const audio = audioRef.current
    if (!audio) return
    if (playing) {
      audio.pause()
      setPlaying(false)
    } else {
      try {
        await audio.play()
        setPlaying(true)
      } catch {
        setMusicError('Musik tidak bisa diputar. Pastikan URL mengarah langsung ke file audio.')
      }
    }
  }

  const openLetter = () => {
    setOpened(true)
    setFinale(false)
  }

  const resetExperience = () => {
    setOpened(false)
    setFinale(false)
    setShowLetter(true)
  }

  return <div className="app">
    <StarField />
    <FloatingHearts burst={finale} />
    <header className="site-header">
      <button className="wordmark" onClick={resetExperience} aria-label="Kembali ke awal"><span className="wordmark-icon"><Heart size={16} fill="currentColor" /></span> LoveYou<span className="wordmark-star">✦</span></button>
      <div className="header-right">
        <span className="made-with"><span className="online-dot" /> a tiny page made with love</span>
        <button className={`music-button ${playing ? 'playing' : ''}`} onClick={toggleMusic}>
          {playing ? <Volume2 size={16} /> : <Music2 size={16} />}
          <span>{playing ? 'Pause music' : 'Play music'}</span>
        </button>
      </div>
    </header>

    <main className="main-content">
      {!opened ? <section className="welcome-view">
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="moon"><span /></div>
        <div className="welcome-copy">
          <div className="eyebrow"><Stars size={14} /> A LITTLE CORNER OF THE UNIVERSE <Stars size={14} /></div>
          <p className="for-line">this little universe belongs to</p>
          <h1>{LOVE_CONFIG.partnerName}<span className="title-heart">♡</span></h1>
          <p className="intro">{LOVE_CONFIG.intro}</p>
          <Envelope onOpen={openLetter} opened={opened} />
          <p className="gentle-hint"><span>✧</span> something lovely is waiting inside <span>✧</span></p>
        </div>
        <div className="bottom-stars"><span>✦</span><span>✧</span><span>✦</span></div>
      </section> : <section className="letter-view">
        <div className="letter-heading">
          <div className="eyebrow"><MoonStar size={14} /> A LETTER FROM MY HEART <MoonStar size={14} /></div>
          <h1>For you, <em>{LOVE_CONFIG.partnerName}</em></h1>
          <p>Some things are easier to feel than to say.</p>
        </div>
        {showLetter && <article className="love-letter">
          <div className="letter-decoration top-left">✧</div><div className="letter-decoration top-right">♡</div>
          <div className="letter-label"><span>✦</span> A LITTLE LETTER <span>✦</span></div>
          <div className="letter-rule"><span>♡</span></div>
          <div className="letter-body">{LOVE_CONFIG.letter}</div>
          <div className="letter-signature">with all my love,<strong>{LOVE_CONFIG.senderName}</strong><span>♡</span></div>
          <div className="letter-decoration bottom-left">✦</div><div className="letter-decoration bottom-right">✧</div>
        </article>}
        {finale ? <div className="final-card">
          <div className="heart-universe"><span className="heart-core">♥</span><span className="heart-ring ring-a">♡</span><span className="heart-ring ring-b">♡</span><span className="heart-spark spark-a">✦</span><span className="heart-spark spark-b">✧</span><span className="heart-spark spark-c">✦</span></div>
          <div className="eyebrow"><Sparkles size={14} /> ONE LAST LITTLE THING <Sparkles size={14} /></div>
          <h2>{LOVE_CONFIG.finalMessage}</h2>
          <p>made for you, with all my heart.</p>
          <button className="secondary-button" onClick={resetExperience}><RotateCcw size={15} /> Start the surprise again</button>
        </div> : <div className="letter-controls">
          <button className="secondary-button" onClick={() => setShowLetter(v => !v)}>{showLetter ? <X size={15} /> : <MailOpen size={15} />}{showLetter ? 'Fold the letter' : 'Read the letter again'}</button>
          <button className="primary-button" onClick={() => setFinale(true)}><Heart size={16} fill="currentColor" /> Open the final surprise <span>♡</span></button>
        </div>}
        {days !== null && days >= 0 && <p className="date-note"><Heart size={13} fill="currentColor" /> {days} days since our special day</p>}
      </section>}
    </main>

    <footer className="site-footer"><span>LoveYou</span><span className="footer-separator">✦</span><span>a little reminder that you are loved</span><Heart size={12} fill="currentColor" /></footer>
    {musicError && <div className="music-notice" role="status"><span>{musicError}</span><button onClick={() => setMusicError('')} aria-label="Tutup pesan"><X size={14}/></button></div>}
    <audio ref={audioRef} src={LOVE_CONFIG.musicUrl || undefined} loop onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} />
  </div>
}
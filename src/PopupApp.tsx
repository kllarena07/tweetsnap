import { useState } from 'react'
import URLInput from './components/URLInput'
import TweetViewer from './components/TweetViewer'
import './popup.css'

type View = 'home' | 'tweet'

export default function PopupApp() {
  const [currentView, setCurrentView] = useState<View>('home')
  const [tweetId, setTweetId] = useState<string>('')

  const handleTweetSubmit = (id: string) => {
    setTweetId(id)
    setCurrentView('tweet')
  }

  const handleBack = () => {
    setCurrentView('home')
    setTweetId('')
  }

  return (
    <div className="popup-container">
      {currentView === 'home' ? (
        <URLInput onSubmit={handleTweetSubmit} />
      ) : (
        <TweetViewer tweetId={tweetId} onBack={handleBack} />
      )}
    </div>
  )
}

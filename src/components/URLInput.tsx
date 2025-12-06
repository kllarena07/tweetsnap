import { useState } from 'react'

interface URLInputProps {
  onSubmit: (tweetId: string) => void
}

export default function URLInput({ onSubmit }: URLInputProps) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')

  const extractTweetId = (tweetUrl: string): string | null => {
    // Support both twitter.com and x.com URLs
    const patterns = [
      /(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/,
      /(?:twitter\.com|x\.com)\/\w+\/statuses\/(\d+)/,
      /(?:twitter\.com|x\.com)\/status\/(\d+)/,
      /^(\d{19})$/, // Direct tweet ID
    ]

    for (const pattern of patterns) {
      const match = tweetUrl.match(pattern)
      if (match) {
        return match[1]
      }
    }

    return null
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const tweetId = extractTweetId(url.trim())

    if (!tweetId) {
      setError('Please enter a valid Twitter/X URL or tweet ID')
      return
    }

    onSubmit(tweetId)
  }

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText()
      setUrl(text)
      setError('')
    } catch (err) {
      console.error('Failed to read clipboard:', err)
      // Fallback: user can manually paste
      alert('Clipboard access denied. Please paste manually (Ctrl+V or Cmd+V).')
    }
  }

  return (
    <div className="url-input-container">
      <div className="header">
        <h1>📸 Tweet Screenshot</h1>
        <p>Enter a tweet URL to capture and copy it to clipboard</p>
      </div>

      <form onSubmit={handleSubmit} className="url-form">
        <div className="input-group">
          <input
            type="text"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value)
              setError('')
            }}
            placeholder="https://twitter.com/user/status/123456789"
            className="url-input"
            autoFocus
          />
          <button
            type="button"
            onClick={handlePaste}
            className="paste-button"
            title="Paste from clipboard"
          >
            📋
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="submit-button">
          Capture Tweet
        </button>
      </form>

      <div className="examples">
        <p className="examples-title">Supported formats:</p>
        <ul className="examples-list">
          <li>https://twitter.com/user/status/123456789</li>
          <li>https://x.com/user/status/123456789</li>
          <li>1234567890123456789 (tweet ID)</li>
        </ul>
      </div>
    </div>
  )
}

import { useEffect, useRef, useState } from 'react'
import { API_BASE } from '../lib/api'

function Bubble({ role, content }) {
  const isUser = role === 'user'
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-br-sm bg-wine text-surface'
            : 'rounded-bl-sm bg-surface text-ink border border-wine/10'
        }`}
      >
        {content}
      </div>
    </div>
  )
}

// Deterministic — states scope plainly rather than relying on the model to
// frame itself the same way on every first turn.
const OPENING_MESSAGE = {
  role: 'assistant',
  content:
    "Hi — I'm Vigila's companion. This is a space to listen and talk through what you're feeling. I'm not a therapist and I can't diagnose anything — just here to listen, and I'll point you toward real support if things ever feel like more than a chat can hold.",
}

export default function CompanionChat() {
  const [messages, setMessages] = useState([OPENING_MESSAGE])
  const [input, setInput] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | error
  const [errorText, setErrorText] = useState('')
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, [messages, status])

  async function handleSubmit(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text || status === 'sending') return

    const nextMessages = [...messages, { role: 'user', content: text }]
    setMessages(nextMessages)
    setInput('')
    setStatus('sending')
    setErrorText('')

    try {
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.detail || `Request failed: ${res.status}`)
      }
      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }])
      setStatus('idle')
    } catch (err) {
      setStatus('error')
      setErrorText(err.message || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="flex h-[520px] flex-col overflow-hidden rounded-2xl border border-wine/10 bg-background">
      <div className="flex-1 space-y-3 overflow-y-auto p-4">
        {messages.map((m, i) => (
          <Bubble key={i} role={m.role} content={m.content} />
        ))}
        {status === 'sending' && (
          <div className="flex justify-start">
            <div className="rounded-2xl rounded-bl-sm border border-wine/10 bg-surface px-4 py-2.5 text-sm text-ink/50">
              typing&hellip;
            </div>
          </div>
        )}
        {status === 'error' && (
          <p className="text-sm text-wine/80" role="alert">
            {errorText}
          </p>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-wine/10 bg-surface p-3">
        <label htmlFor="companion-input" className="sr-only">
          Message Vigila&rsquo;s companion
        </label>
        <input
          id="companion-input"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type here…"
          disabled={status === 'sending'}
          className="flex-1 rounded-full border border-wine/15 bg-background px-4 py-2 text-sm text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-wine/30"
        />
        <button
          type="submit"
          disabled={status === 'sending' || !input.trim()}
          className="rounded-full bg-wine px-5 py-2 text-sm font-semibold text-surface transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          Send
        </button>
      </form>
    </div>
  )
}

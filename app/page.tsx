'use client'

import { useState, useEffect, useCallback } from 'react'
import { Flower2, Leaf, Heart, Download, Edit3, Save, X, RefreshCw, MessageSquare } from 'lucide-react'

export default function Home() {
  const [recipientName, setRecipientName] = useState('')
  const [senderName, setSenderName] = useState('')
  const [bulletPoints, setBulletPoints] = useState('')
  const [poemContent, setPoemContent] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [showPoem, setShowPoem] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState('')
  const [previewContent, setPreviewContent] = useState('')
  const [feedback, setFeedback] = useState('')
  const [showFeedback, setShowFeedback] = useState(false)
  const [isRevising, setIsRevising] = useState(false)

  // Real-time preview generation
  const generatePreview = useCallback(() => {
    const points = bulletPoints
      .split('\n')
      .filter(line => line.trim())
      .map(line => line.replace(/^[•\-*]\s*/, '').trim())
      .filter(point => point.length > 0)

    if (recipientName.trim() && points.length > 0) {
      const preview = `For ${recipientName},

${points.map(point => `${point}`).join('\n')}

With love and gratitude,
${senderName.trim() || '[Your name]'}`

      setPreviewContent(preview)
    } else if (recipientName.trim() || senderName.trim()) {
      setPreviewContent(`For ${recipientName.trim() || '[Recipient\'s name]'},

[Start writing what you love about this person...]

With love and gratitude,
${senderName.trim() || '[Your name]'}`)
    } else {
      setPreviewContent(`For [Recipient's name],

[Add the person's name and what you love about them...]

With love and gratitude,
${senderName.trim() || '[Your name]'}`)
    }
  }, [recipientName, senderName, bulletPoints])

  useEffect(() => {
    if (recipientName.trim() || senderName.trim() || bulletPoints.trim()) {
      generatePreview()
    } else {
      setPreviewContent('')
    }
  }, [generatePreview])

  const generatePoem = async () => {
    if (!recipientName.trim() || !bulletPoints.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientName, senderName, bulletPoints })
      })

      if (!response.ok) throw new Error('Failed to generate poem')

      const data = await response.json()
      setPoemContent(data.poem)
      setShowPoem(true)
      setIsEditing(false)
      setShowFeedback(false)
      setFeedback('')
    } catch (error) {
      console.error('Error generating poem:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const revisePoem = async () => {
    if (!feedback.trim()) return

    setIsRevising(true)
    try {
      const response = await fetch('/api/revise-poem', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          recipientName, 
          senderName, 
          bulletPoints, 
          currentPoem: poemContent,
          feedback 
        })
      })

      if (!response.ok) throw new Error('Failed to revise poem')

      const data = await response.json()
      setPoemContent(data.poem)
      setShowFeedback(false)
      setFeedback('')
    } catch (error) {
      console.error('Error revising poem:', error)
    } finally {
      setIsRevising(false)
    }
  }

  const downloadPDF = async () => {
    if (!poemContent.trim()) return

    setIsDownloading(true)
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ recipientName, senderName, poemContent })
      })

      if (!response.ok) throw new Error('Failed to generate PDF')

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `gratitude-poem-for-${recipientName}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading PDF:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const handleEdit = () => {
    setEditedContent(poemContent)
    setIsEditing(true)
  }

  const handleSave = () => {
    setPoemContent(editedContent)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const renderPoemContent = (content: string, showTitle: boolean = false) => (
    <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-10 min-h-[600px] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
      {/* Warm background texture */}
      <div className="absolute inset-0 opacity-20">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f59e0b' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Soft decorative elements */}
      <div className="absolute top-6 right-6 opacity-30">
        <Flower2 className="h-8 w-8 text-pink-300" />
      </div>
      <div className="absolute bottom-6 left-6 opacity-30">
        <Heart className="h-6 w-6 text-rose-300" />
      </div>
      <div className="absolute top-1/2 left-4 opacity-20">
        <Leaf className="h-4 w-4 text-orange-300" />
      </div>
      
      {/* Subtle border glow */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-pink-100/20 pointer-events-none"></div>
      
      <div className="relative z-10">
        {/* Title - only show for rendered poem */}
        {showTitle && (
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-gray-800 mb-2">For {recipientName || '[Recipient]'}</h2>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-pink-300 to-transparent mx-auto"></div>
          </div>
        )}
        
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed text-lg font-serif pb-8" style={{
          textShadow: '0 1px 3px rgba(0,0,0,0.05)',
          lineHeight: '2',
          letterSpacing: '0.01em'
        }}>
          {content}
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 relative overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Flower2 className="h-8 w-8 text-pink-200" />
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '1s' }}>
          <Leaf className="h-6 w-6 text-green-200" />
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '2s' }}>
          <Heart className="h-6 w-6 text-red-200" />
        </div>
        <div className="absolute bottom-20 right-10 animate-float" style={{ animationDelay: '3s' }}>
          <Flower2 className="h-8 w-8 text-yellow-200" />
        </div>
        <div className="absolute top-1/2 left-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <Leaf className="h-5 w-5 text-emerald-200" />
        </div>
        <div className="absolute top-1/3 right-1/3 animate-float" style={{ animationDelay: '1.5s' }}>
          <Heart className="h-4 w-4 text-rose-200" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flower2 className="h-8 w-8 text-pink-400 mr-3" />
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-pink-600 via-rose-600 to-red-600 bg-clip-text text-transparent">
              Gratitude Poems
            </h1>
            <Flower2 className="h-8 w-8 text-pink-400 ml-3" />
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-medium">
            Share your heart with those who matter most.
          </p>
        </div>

        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          {/* Input Form */}
          <div className="xl:col-span-1 sticky top-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-pink-100 h-[600px] flex flex-col">
              <h2 className="text-2xl font-display font-semibold text-gray-800 mb-6 flex items-center">
                <Heart className="h-6 w-6 text-pink-500 mr-2" />
                Create Your Poem
              </h2>

              {/* Recipient and Sender Fields */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    To:
                  </label>
                  <input
                    type="text"
                    value={recipientName}
                    onChange={(e) => setRecipientName(e.target.value)}
                    placeholder="Name..."
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    From:
                  </label>
                  <input
                    type="text"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    placeholder="Your name..."
                    className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 backdrop-blur-sm transition-all duration-200"
                  />
                </div>
              </div>

              {/* Bullet Points */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  What do you love about this person?
                </label>
                <textarea
                  value={bulletPoints}
                  onChange={(e) => setBulletPoints(e.target.value)}
                  placeholder="I love the way..."
                  rows={8}
                  className="w-full px-4 py-3 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none transition-all duration-200"
                />
              </div>

              {/* Generate Button */}
              <button
                onClick={generatePoem}
                disabled={!recipientName.trim() || !bulletPoints.trim() || isGenerating}
                className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white py-4 px-6 rounded-lg font-semibold hover:from-pink-600 hover:to-rose-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating your poem...
                  </div>
                ) : (
                  <div className="flex items-center justify-center">
                    <Flower2 className="h-5 w-5 mr-2" />
                    Create Your Poem
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Preview/Generated Poem */}
          <div className="xl:col-span-2 mt-8 xl:mt-0">
            {showPoem ? (
              <div className="relative">
                {/* Action Buttons - Top Right */}
                <div className="absolute top-4 right-4 z-20 flex space-x-2">
                  {!isEditing && !showFeedback && (
                    <>
                      <button
                        onClick={downloadPDF}
                        disabled={isDownloading}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-2 px-3 rounded-lg font-medium hover:from-emerald-600 hover:to-teal-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        {isDownloading ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Creating...
                          </>
                        ) : (
                          <>
                            <Download className="h-3 w-3 mr-1" />
                            Save PDF
                          </>
                        )}
                      </button>

                      <button
                        onClick={() => setShowFeedback(true)}
                        className="bg-gradient-to-r from-orange-500 to-amber-500 text-white py-2 px-3 rounded-lg font-medium hover:from-orange-600 hover:to-amber-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" />
                        Revise
                      </button>

                      <button
                        onClick={handleEdit}
                        className="bg-gradient-to-r from-purple-500 to-violet-500 text-white py-2 px-3 rounded-lg font-medium hover:from-purple-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <Edit3 className="h-3 w-3 mr-1" />
                        Edit
                      </button>
                    </>
                  )}

                  {isEditing ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={handleSave}
                        className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-3 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </button>
                      <button
                        onClick={handleCancel}
                        className="bg-gradient-to-r from-gray-500 to-slate-500 text-white py-2 px-3 rounded-lg font-medium hover:from-gray-600 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    </div>
                  ) : showFeedback ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={revisePoem}
                        disabled={!feedback.trim() || isRevising}
                        className="bg-gradient-to-r from-green-500 to-emerald-500 text-white py-2 px-3 rounded-lg font-medium hover:from-green-600 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        {isRevising ? (
                          <>
                            <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1"></div>
                            Revising...
                          </>
                        ) : (
                          <>
                            <RefreshCw className="h-3 w-3 mr-1" />
                            Revise
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setShowFeedback(false)
                          setFeedback('')
                        }}
                        className="bg-gradient-to-r from-gray-500 to-slate-500 text-white py-2 px-3 rounded-lg font-medium hover:from-gray-600 hover:to-slate-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center text-sm"
                      >
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </button>
                    </div>
                  ) : null}
                </div>

                {/* Feedback Input */}
                {showFeedback && (
                  <div className="absolute top-16 right-4 z-20 w-80 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-xl border border-pink-200">
                    <h3 className="text-sm font-semibold text-gray-800 mb-2">How would you like to revise this poem?</h3>
                    <textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Make it more romantic... Make it shorter... Add more specific details... Change the tone to..."
                      rows={4}
                      className="w-full px-3 py-2 border border-pink-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent bg-white/50 backdrop-blur-sm resize-none transition-all duration-200 text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Be specific about what you'd like to change. The AI will incorporate your feedback.
                    </p>
                  </div>
                )}

                {isEditing ? (
                  <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className="w-full h-full min-h-[500px] px-4 py-3 border border-pink-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none text-gray-800 leading-relaxed text-lg bg-white/80 backdrop-blur-sm font-serif"
                    placeholder="Edit your poem here..."
                  />
                ) : (
                  renderPoemContent(poemContent, true)
                )}
              </div>
            ) : (
              <div>
                {previewContent ? (
                  renderPoemContent(previewContent, false)
                ) : (
                  <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-pink-50 border border-pink-200 rounded-2xl p-10 h-[600px] shadow-xl hover:shadow-2xl transition-all duration-500 relative overflow-hidden flex items-center justify-center">
                    <div className="absolute top-6 right-6 opacity-30">
                      <Flower2 className="h-8 w-8 text-pink-300" />
                    </div>
                    <div className="absolute bottom-6 left-6 opacity-30">
                      <Heart className="h-6 w-6 text-rose-300" />
                    </div>
                    <div className="absolute top-1/2 left-4 opacity-20">
                      <Leaf className="h-4 w-4 text-orange-300" />
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-100/20 via-orange-100/20 to-pink-100/20 pointer-events-none"></div>
                    <div className="text-center text-gray-500 relative z-10">
                      <Flower2 className="h-16 w-16 mx-auto mb-4 text-pink-300" />
                      <p className="text-lg font-medium mb-2">Your poem will appear here</p>
                      <p className="text-sm">Start typing above to see your poem take shape in real-time</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

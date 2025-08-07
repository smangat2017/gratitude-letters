import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { recipientName, bulletPoints } = await request.json()

    if (!recipientName || !bulletPoints) {
      return NextResponse.json(
        { error: 'Recipient name and bullet points are required' },
        { status: 400 }
      )
    }

    // Parse bullet points
    const points = bulletPoints
      .split('\n')
      .filter((line: string) => line.trim())
      .map((line: string) => line.replace(/^[•\-*]\s*/, '').trim())
      .filter((point: string) => point.length > 0)

    if (points.length === 0) {
      return NextResponse.json(
        { error: 'Please provide at least one bullet point' },
        { status: 400 }
      )
    }

    // Claude API call
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 1000,
        system: `You are helping someone write a genuine, heartfelt gratitude letter. Your job is to take their bullet points and turn them into a warm, personal letter that sounds like it was written by a real person expressing genuine appreciation.

Key guidelines:
- Write in a natural, conversational tone - avoid overly formal or flowery language
- Keep sentences simple and direct - don't use complex vocabulary or metaphors
- Make it feel personal and specific to the relationship
- Use the recipient's name naturally throughout
- Keep the letter warm but not overly sentimental
- Avoid clichés or generic phrases
- Make it sound like something a real person would actually write
- Focus on the specific things they mentioned being grateful for
- Keep the overall tone sincere and authentic

The letter should feel like it's written by someone who genuinely cares about and appreciates the recipient, not by an AI trying to sound poetic.`,
        messages: [
          {
            role: 'user',
            content: `Please write a heartfelt gratitude letter to ${recipientName} based on these bullet points of what I'm grateful for:

${points.map((point: string) => `• ${point}`).join('\n')}

Please write this as a complete letter with proper formatting, including a greeting and closing. Make it personal, warm, and genuine.`
          }
        ]
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Claude API error:', errorData)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const letter = data.content[0].text

    return NextResponse.json({ letter })
  } catch (error) {
    console.error('Error generating letter:', error)
    return NextResponse.json(
      { error: 'Failed to generate letter' },
      { status: 500 }
    )
  }
} 
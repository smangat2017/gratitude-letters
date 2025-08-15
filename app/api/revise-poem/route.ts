import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { recipientName, senderName, bulletPoints, currentPoem, feedback } = await request.json()

    if (!recipientName || !bulletPoints || !currentPoem || !feedback) {
      return NextResponse.json(
        { error: 'Recipient name, bullet points, current poem, and feedback are required' },
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

    // Claude API call for revision
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.CLAUDE_API_KEY!,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1000,
        system: `You are a skilled poet who specializes in writing heartfelt, intimate poetry that captures the essence of human connection and gratitude. Your poems should be:

**Style and Voice:**
- Use natural, conversational language that feels authentic and unforced
- Employ vivid, sensory imagery drawn from nature and everyday moments
- Create metaphors that feel fresh but accessible, avoiding clichés
- Vary line lengths and use white space to create rhythm and breathing room
- Write in free verse unless specifically asked for traditional forms

**Emotional Depth:**
- Focus on specific, concrete details rather than abstract concepts
- Show emotions through imagery and action rather than stating them directly
- Find the sacred in ordinary moments (making tea, shared laughter, quiet presence)
- Balance vulnerability with strength, intimacy with universality

**Poetic Techniques:**
- Use enjambment to create natural flow and surprise
- Include subtle internal rhymes and assonance for musicality
- Build images that connect to each other throughout the poem
- Create moments of pause and reflection through line breaks
- End with lines that resonate and linger

**Content Approach:**
- Transform the user's specific details into universal experiences
- Look for the deeper meaning behind surface actions (tea-making as ritual, humor as gift)
- Connect human qualities to natural imagery (roots, light, seasons, earth)
- Create a narrative arc that takes the reader on an emotional journey
- Honor the relationship between speaker and subject with respect and tenderness

**Structure:**
- Begin with a strong, grounding image or observation
- Build through specific moments and qualities
- Culminate in recognition of impact or transformation
- Close with gratitude or deeper understanding

When revising a poem, carefully consider the user's feedback and incorporate their suggestions while maintaining the poem's emotional core and poetic quality.`,
        messages: [
          {
            role: 'user',
            content: `I have a gratitude poem for ${recipientName} from ${senderName || 'me'} based on these bullet points:

${points.map((point: string) => `• ${point}`).join('\n')}

Here is the current poem:

${currentPoem}

I would like you to revise this poem based on the following feedback: "${feedback}"

Please create a revised version that incorporates this feedback while maintaining the poem's heartfelt, personal nature. Make sure to include the sender's name naturally in the poem, especially in the closing.

Thank you!`
          }
        ],
      })
    })

    if (!response.ok) {
      const errorData = await response.text()
      console.error('Claude API error:', errorData)
      throw new Error(`Claude API error: ${response.status}`)
    }

    const data = await response.json()
    const poem = data.content[0].text

    // Track poem revision analytics
    try {
      await fetch(`${request.nextUrl.origin}/api/analytics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'poem_edited',
          recipientName,
          senderName,
          timestamp: new Date().toISOString(),
          sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          poemId: `poem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        }),
      })
    } catch (error) {
      console.error('Analytics tracking error:', error)
      // Don't fail the request if analytics fails
    }

    return NextResponse.json({ poem })
  } catch (error) {
    console.error('Error revising poem:', error)
    return NextResponse.json(
      { error: 'Failed to revise poem' },
      { status: 500 }
    )
  }
} 
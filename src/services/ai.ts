// ============================================
// AI SERVICE - OpenAI Integration
// ============================================
// Purpose: Generate AI-powered insights and reports
// Why: Turn raw data into actionable intelligence
// Framework: OpenAI GPT-4 API

import OpenAI from 'openai'

// ============================================
// INITIALIZE OPENAI CLIENT
// ============================================
// What: Create OpenAI client instance
// Why: Interact with OpenAI API

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

// ============================================
// GENERATE CHANGE INSIGHT
// ============================================
// What: Generate a summary for a single change
// Why: Help users understand what changed and why it matters
// How: Use GPT-4 to analyze the change

export async function generateChangeInsight(changeData: {
  competitorName: string
  changeType: string
  oldValue: string
  newValue: string
  timestamp: string
}): Promise<string> {
  const prompt = `
You are a competitive intelligence analyst. Analyze this competitor change and provide a concise, actionable insight.

Competitor: ${changeData.competitorName}
Change Type: ${changeData.changeType}
Old Value: ${changeData.oldValue}
New Value: ${changeData.newValue}
Timestamp: ${changeData.timestamp}

Provide a brief insight (2-3 sentences) that:
1. Summarizes what changed
2. Explains the potential business impact
3. Suggests what to monitor next

Be concise, professional, and actionable.
  `.trim()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a competitive intelligence analyst helping businesses track competitor movements.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    })

    return response.choices[0].message.content || 'Unable to generate insight'
  } catch (error) {
    console.error('Error generating insight:', error)
    return 'Unable to generate insight at this time'
  }
}

// ============================================
// GENERATE WEEKLY REPORT
// ============================================
// What: Generate comprehensive weekly report
// Why: Give users a complete overview of all competitor activity
// How: Analyze all changes from the week

export async function generateWeeklyReport(competitorsData: {
  competitorName: string
  changes: Array<{
    type: string
    oldValue: string
    newValue: string
    timestamp: string
  }>
}[]): Promise<{
  summary: string
  keyChanges: string[]
  recommendations: string[]
}> {
  // Build the prompt with all competitor data
  const competitorsText = competitorsData
    .map((comp) => {
      const changesText = comp.changes
        .map((change) => `- ${change.type}: ${change.oldValue} → ${change.newValue}`)
        .join('\n')
      
      return `${comp.competitorName}:\n${changesText}`
    })
    .join('\n\n')

  const prompt = `
You are a competitive intelligence analyst. Generate a comprehensive weekly competitive intelligence report.

COMPETITOR ACTIVITY THIS WEEK:

${competitorsText}

Generate a report with:
1. EXECUTIVE SUMMARY (3-4 sentences): Overall competitive landscape this week
2. KEY CHANGES (3-5 bullet points): Most significant changes detected
3. STRATEGIC RECOMMENDATIONS (3-5 bullet points): Actionable recommendations

Format your response as JSON:
{
  "summary": "Executive summary text",
  "keyChanges": ["Change 1", "Change 2", ...],
  "recommendations": ["Recommendation 1", "Recommendation 2", ...]
}

Be strategic, concise, and actionable.
  `.trim()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a competitive intelligence analyst. Always respond with valid JSON.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 1000,
      response_format: { type: 'json_object' },
    })

    const content = response.choices[0].message.content || '{}'
    const parsed = JSON.parse(content)
    
    return {
      summary: parsed.summary || 'No summary available',
      keyChanges: parsed.keyChanges || [],
      recommendations: parsed.recommendations || [],
    }
  } catch (error) {
    console.error('Error generating weekly report:', error)
    return {
      summary: 'Unable to generate report at this time',
      keyChanges: [],
      recommendations: [],
    }
  }
}

// ============================================
// GENERATE COMPETITOR SUMMARY
// ============================================
// What: Generate summary for a single competitor
// Why: Quick overview of competitor activity
// How: Analyze all changes for one competitor

export async function generateCompetitorSummary(
  competitorName: string,
  changes: Array<{
    type: string
    oldValue: string
    newValue: string
    timestamp: string
  }>
): Promise<string> {
  if (changes.length === 0) {
    return `${competitorName} has had no significant changes recently.`
  }

  const changesText = changes
    .map((change) => `- ${change.type}: ${change.oldValue} → ${change.newValue}`)
    .join('\n')

  const prompt = `
Analyze this competitor's recent activity and provide a brief summary.

Competitor: ${competitorName}

Recent Changes:
${changesText}

Provide a 2-3 sentence summary of what this competitor has been doing.
  `.trim()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a competitive intelligence analyst.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 150,
    })

    return response.choices[0].message.content || 'Unable to generate summary'
  } catch (error) {
    console.error('Error generating competitor summary:', error)
    return 'Unable to generate summary at this time'
  }
}

// ============================================
// GENERATE RECOMMENDATION
// ============================================
// What: Generate actionable recommendation
// Why: Help users decide what to do next
// How: Analyze changes and suggest actions

export async function generateRecommendation(
  changeType: string,
  oldValue: string,
  newValue: string
): Promise<string> {
  const prompt = `
You are a competitive intelligence analyst. Based on this change, provide ONE actionable recommendation.

Change Type: ${changeType}
Old Value: ${oldValue}
New Value: ${newValue}

Provide a single, specific, actionable recommendation (1 sentence).
  `.trim()

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are a competitive intelligence analyst providing actionable recommendations.',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 100,
    })

    return response.choices[0].message.content || 'Monitor this change closely'
  } catch (error) {
    console.error('Error generating recommendation:', error)
    return 'Monitor this change closely'
  }
}

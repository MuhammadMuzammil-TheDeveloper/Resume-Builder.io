
export interface ATSScore {
  score: number;
  feedback: string[];
  improvements: string[];
}

export const openaiService = {
  apiKey: 'sk-proj-your-openai-api-key-here', // Replace with actual API key from OpenAI dashboard

  async generateResume(resumeData: any): Promise<string> {
    try {
      // Check if API key is still placeholder
      if (this.apiKey === 'sk-proj-your-openai-api-key-here') {
        // Return mock resume for demo purposes
        return this.generateMockResume(resumeData);
      }

      const prompt = `You are an expert resume writer. Based on the following data, generate a clean, ATS-friendly resume in plain text format:

Full Name: ${resumeData.fullName}
Job Title: ${resumeData.jobTitle}
Summary: ${resumeData.summary}
Skills: ${resumeData.skills?.join(', ')}
Experience: ${JSON.stringify(resumeData.experience)}
Education: ${JSON.stringify(resumeData.education)}
Certifications: ${resumeData.certifications?.join(', ')}
Projects: ${JSON.stringify(resumeData.projects)}

Please format this as a professional, ATS-optimized resume with proper sections and formatting.`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an expert resume writer who creates ATS-friendly, professional resumes.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 2000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate resume');
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } catch (error) {
      console.error('Error generating resume:', error);
      // Fallback to mock resume
      return this.generateMockResume(resumeData);
    }
  },

  generateMockResume(resumeData: any): string {
    return `${resumeData.fullName.toUpperCase()}
${resumeData.jobTitle}

PROFESSIONAL SUMMARY
${resumeData.summary}

CORE COMPETENCIES
${resumeData.skills?.join(' • ') || 'No skills listed'}

PROFESSIONAL EXPERIENCE
${resumeData.experience?.map((exp: any) => `
${exp.position} | ${exp.company}
${exp.startDate} - ${exp.endDate}
${exp.description}
`).join('') || 'No experience listed'}

EDUCATION
${resumeData.education?.map((edu: any) => `
${edu.degree}
${edu.institution}
${edu.startDate} - ${edu.endDate}
`).join('') || 'No education listed'}

${resumeData.certifications?.length ? `CERTIFICATIONS
${resumeData.certifications.join('\n')}` : ''}

${resumeData.projects?.length ? `PROJECTS
${resumeData.projects.map((proj: any) => `
${proj.name}
${proj.description}
Technologies: ${proj.technologies}
${proj.link ? `Link: ${proj.link}` : ''}
`).join('')}` : ''}`.trim();
  },

  async scanResumeATS(resumeText: string): Promise<ATSScore> {
    try {
      // Check if API key is still placeholder
      if (this.apiKey === 'sk-proj-your-openai-api-key-here') {
        // Return mock ATS score for demo purposes
        return this.generateMockATSScore(resumeText);
      }

      const prompt = `Analyze the following resume for ATS compatibility and provide a score out of 100, along with specific feedback and improvement suggestions:

${resumeText}

Please respond in JSON format with:
{
  "score": number (0-100),
  "feedback": ["feedback point 1", "feedback point 2", ...],
  "improvements": ["improvement suggestion 1", "improvement suggestion 2", ...]
}`;

      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            {
              role: 'system',
              content: 'You are an ATS (Applicant Tracking System) expert who analyzes resumes for compatibility and optimization.'
            },
            {
              role: 'user',
              content: prompt
            }
          ],
          max_tokens: 1000,
          temperature: 0.3,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to scan resume');
      }

      const data = await response.json();
      const result = JSON.parse(data.choices[0].message.content);
      
      return {
        score: result.score,
        feedback: result.feedback,
        improvements: result.improvements
      };
    } catch (error) {
      console.error('Error scanning resume:', error);
      // Fallback to mock ATS score
      return this.generateMockATSScore(resumeText);
    }
  },

  generateMockATSScore(resumeText: string): ATSScore {
    // Simple analysis for demo purposes
    const wordCount = resumeText.split(' ').length;
    const hasContactInfo = resumeText.toLowerCase().includes('@');
    const hasSkills = resumeText.toLowerCase().includes('skill');
    const hasExperience = resumeText.toLowerCase().includes('experience');
    
    let score = 60; // Base score
    
    if (wordCount > 200) score += 10;
    if (hasContactInfo) score += 10;
    if (hasSkills) score += 10;
    if (hasExperience) score += 10;
    
    return {
      score: Math.min(score, 95),
      feedback: [
        'Clear section headers found',
        'Professional formatting detected',
        'Proper contact information included',
        'Skills section well-structured'
      ],
      improvements: [
        'Add more quantifiable achievements',
        'Include relevant keywords for your industry',
        'Consider adding a professional summary',
        'Use action verbs to start bullet points'
      ]
    };
  }
};

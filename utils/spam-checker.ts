// Spam score checker to ensure emails pass spam filters

export interface SpamCheckResult {
  score: number; // 0-10 (lower is better)
  passed: boolean; // true if score < 5
  issues: SpamIssue[];
  suggestions: string[];
}

export interface SpamIssue {
  severity: 'high' | 'medium' | 'low';
  message: string;
  location: 'subject' | 'body' | 'both';
}

// Comprehensive spam check
export function checkSpamScore(subject: string, body: string): SpamCheckResult {
  const issues: SpamIssue[] = [];
  const suggestions: string[] = [];
  let score = 0;
  
  // Convert to lowercase for checking
  const lowerSubject = subject.toLowerCase();
  const lowerBody = body.toLowerCase();
  const combinedText = lowerSubject + ' ' + lowerBody;
  
  // 1. Check for spam trigger words
  const spamWords = {
    high: [
      'free money', 'make money fast', 'get rich', 'guaranteed income',
      'double your', 'triple your', 'no risk', 'risk free', '100% free',
      'act now', 'limited time offer', 'this is not spam', 'dear friend'
    ],
    medium: [
      'click here', 'buy now', 'order now', 'subscribe now', 'sign up now',
      'special promotion', 'once in lifetime', 'congratulations',
      'you have been selected', 'winner', 'claim your', 'urgent'
    ],
    low: [
      'free', 'bonus', 'extra income', 'opportunity', 'serious cash',
      'guarantee', 'amazing', 'incredible', 'miracle'
    ]
  };
  
  // Check high-severity spam words
  spamWords.high.forEach(word => {
    if (combinedText.includes(word)) {
      score += 3;
      issues.push({
        severity: 'high',
        message: `Contains high-risk spam phrase: "${word}"`,
        location: lowerSubject.includes(word) ? 'subject' : 'body'
      });
      suggestions.push(`Remove or rephrase "${word}"`);
    }
  });
  
  // Check medium-severity spam words
  spamWords.medium.forEach(word => {
    if (combinedText.includes(word)) {
      score += 1.5;
      issues.push({
        severity: 'medium',
        message: `Contains spam trigger word: "${word}"`,
        location: lowerSubject.includes(word) ? 'subject' : 'body'
      });
    }
  });
  
  // Check low-severity spam words
  let lowSeverityCount = 0;
  spamWords.low.forEach(word => {
    if (combinedText.includes(word)) {
      lowSeverityCount++;
    }
  });
  if (lowSeverityCount > 3) {
    score += 1;
    issues.push({
      severity: 'low',
      message: `Too many marketing words (${lowSeverityCount} found)`,
      location: 'both'
    });
    suggestions.push('Use more professional, specific language');
  }
  
  // 2. Check capitalization
  const capsInSubject = (subject.match(/[A-Z]/g) || []).length;
  const capsRatioSubject = capsInSubject / subject.length;
  if (capsRatioSubject > 0.5) {
    score += 2;
    issues.push({
      severity: 'high',
      message: 'Subject line has excessive capitalization',
      location: 'subject'
    });
    suggestions.push('Use normal capitalization in subject line');
  }
  
  const capsInBody = (body.match(/[A-Z]/g) || []).length;
  const capsRatioBody = capsInBody / body.length;
  if (capsRatioBody > 0.3) {
    score += 1;
    issues.push({
      severity: 'medium',
      message: 'Body has excessive capitalization',
      location: 'body'
    });
    suggestions.push('Reduce ALL CAPS text in body');
  }
  
  // 3. Check exclamation marks
  const exclamationCount = (combinedText.match(/!/g) || []).length;
  if (exclamationCount > 5) {
    score += 1.5;
    issues.push({
      severity: 'medium',
      message: `Too many exclamation marks (${exclamationCount} found)`,
      location: 'both'
    });
    suggestions.push('Limit exclamation marks to 2-3 maximum');
  }
  
  // 4. Check for excessive links
  const linkCount = (body.match(/https?:\/\//g) || []).length;
  if (linkCount > 5) {
    score += 1;
    issues.push({
      severity: 'medium',
      message: `Too many links (${linkCount} found)`,
      location: 'body'
    });
    suggestions.push('Reduce number of links to 3-4 maximum');
  }
  
  // 5. Check for URL shorteners (can trigger spam filters)
  const shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 't.co'];
  shorteners.forEach(shortener => {
    if (body.includes(shortener)) {
      score += 0.5;
      issues.push({
        severity: 'low',
        message: `Contains URL shortener: ${shortener}`,
        location: 'body'
      });
      suggestions.push('Use full URLs instead of link shorteners');
    }
  });
  
  // 6. Check subject line length
  if (subject.length < 10) {
    score += 0.5;
    issues.push({
      severity: 'low',
      message: 'Subject line is very short',
      location: 'subject'
    });
    suggestions.push('Subject line should be at least 10 characters');
  }
  if (subject.length > 100) {
    score += 0.5;
    issues.push({
      severity: 'low',
      message: 'Subject line is very long',
      location: 'subject'
    });
    suggestions.push('Keep subject line under 100 characters');
  }
  
  // 7. Check for excessive special characters
  const specialChars = (subject.match(/[!@#$%^&*()_+=\[\]{};:'",.<>?]/g) || []).length;
  if (specialChars > 5) {
    score += 1;
    issues.push({
      severity: 'medium',
      message: 'Subject has too many special characters',
      location: 'subject'
    });
    suggestions.push('Reduce special characters in subject line');
  }
  
  // 8. Check for words in all caps
  const allCapsWords = subject.match(/\b[A-Z]{3,}\b/g) || [];
  if (allCapsWords.length > 1) {
    score += 1;
    issues.push({
      severity: 'medium',
      message: `Multiple words in all caps: ${allCapsWords.join(', ')}`,
      location: 'subject'
    });
    suggestions.push('Avoid multiple words in all caps');
  }
  
  // 9. Check text-to-image ratio (for HTML emails)
  // Note: We're analyzing HTML content for spam detection, not rendering it
  // This is safe as the content is never injected into the DOM
  if (body.includes('<img')) {
    const imageCount = (body.match(/<img[^>]*>/g) || []).length;
    // Strip all HTML tags for text length calculation
    // Using non-greedy match and dotAll flag for security
    const textLength = body.replace(/<[^>]*?>/gs, '').trim().length;
    if (imageCount > 3 && textLength < 200) {
      score += 1;
      issues.push({
        severity: 'medium',
        message: 'Too many images relative to text',
        location: 'body'
      });
      suggestions.push('Add more text content or reduce images');
    }
  }
  
  // 10. Check for missing plain text content
  if (body.includes('<html>') && !body.includes('text/plain')) {
    suggestions.push('Consider including a plain text version');
  }
  
  // Positive signals (reduce score)
  // Professional email structure
  if (body.includes('Hi ') || body.includes('Hello ')) {
    score = Math.max(0, score - 0.5);
  }
  
  // Proper signature
  if (body.includes('Best,') || body.includes('Regards,') || body.includes('Thanks,')) {
    score = Math.max(0, score - 0.5);
  }
  
  // Personal touch
  if (body.match(/I noticed|I've been following|I saw|I read/i)) {
    score = Math.max(0, score - 0.5);
  }
  
  // Additional suggestions if score is still high
  if (score > 3) {
    suggestions.push('Make email more personal and less promotional');
    suggestions.push('Focus on specific value proposition');
    suggestions.push('Remove sales-y language');
  }
  
  return {
    score: Math.round(score * 10) / 10, // Round to 1 decimal
    passed: score < 5,
    issues,
    suggestions: [...new Set(suggestions)] // Remove duplicates
  };
}

// Quick spam check (just returns pass/fail)
export function quickSpamCheck(subject: string, body: string): boolean {
  const result = checkSpamScore(subject, body);
  return result.passed;
}

// Get spam score rating
export function getSpamRating(score: number): {
  rating: string;
  color: string;
  emoji: string;
} {
  if (score < 2) {
    return {
      rating: 'Excellent',
      color: '#10b981', // green
      emoji: '✅'
    };
  } else if (score < 5) {
    return {
      rating: 'Good',
      color: '#3b82f6', // blue
      emoji: '👍'
    };
  } else if (score < 7) {
    return {
      rating: 'Warning',
      color: '#f59e0b', // amber
      emoji: '⚠️'
    };
  } else {
    return {
      rating: 'High Risk',
      color: '#ef4444', // red
      emoji: '🚫'
    };
  }
}

// Suggest improvements to reduce spam score
export function suggestImprovements(subject: string, body: string): string[] {
  const result = checkSpamScore(subject, body);
  return result.suggestions;
}

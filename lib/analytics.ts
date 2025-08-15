import { track } from '@vercel/analytics'

export interface AnalyticsEvent {
  event: 'poem_generated' | 'poem_edited' | 'poem_saved';
  timestamp: string;
  sessionId: string;
  poemId: string;
  recipientName?: string;
  senderName?: string;
  editCount?: number;
  userAgent?: string;
  ip?: string;
}

class Analytics {
  private sessionId: string;
  private poemId: string;
  private editCount: number = 0;

  constructor() {
    this.sessionId = this.generateSessionId();
    this.poemId = this.generatePoemId();
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generatePoemId(): string {
    return `poem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private async sendEvent(event: Omit<AnalyticsEvent, 'timestamp' | 'sessionId' | 'poemId'>): Promise<void> {
    try {
      // Track with Vercel Analytics
      track(event.event, {
        recipientName: event.recipientName || 'anonymous',
        senderName: event.senderName || 'anonymous',
        editCount: event.editCount || 0,
        sessionId: this.sessionId,
        poemId: this.poemId,
      });

      console.log('Vercel Analytics event tracked:', event.event, {
        recipientName: event.recipientName || 'anonymous',
        senderName: event.senderName || 'anonymous',
        editCount: event.editCount || 0,
      });
    } catch (error) {
      console.error('Analytics error:', error);
      // Don't throw - analytics failures shouldn't break the app
    }
  }

  trackPoemGenerated(recipientName?: string, senderName?: string): void {
    console.log('🎯 Tracking poem generation:', { recipientName, senderName });
    this.sendEvent({
      event: 'poem_generated',
      recipientName,
      senderName,
    });
  }

  trackPoemEdited(recipientName?: string, senderName?: string): void {
    this.editCount++;
    console.log('🎯 Tracking poem edit:', { recipientName, senderName, editCount: this.editCount });
    this.sendEvent({
      event: 'poem_edited',
      recipientName,
      senderName,
      editCount: this.editCount,
    });
  }

  trackPoemSaved(recipientName?: string, senderName?: string): void {
    console.log('🎯 Tracking poem save:', { recipientName, senderName, editCount: this.editCount });
    this.sendEvent({
      event: 'poem_saved',
      recipientName,
      senderName,
      editCount: this.editCount,
    });
  }

  // Reset for a new poem session
  resetPoemSession(): void {
    this.poemId = this.generatePoemId();
    this.editCount = 0;
  }

  // Get current stats for debugging
  getStats() {
    return {
      sessionId: this.sessionId,
      poemId: this.poemId,
      editCount: this.editCount,
    };
  }
}

// Create a singleton instance
export const analytics = new Analytics();

import { Component } from '@angular/core';

@Component({
  selector: 'app-live-chat',
  templateUrl: './live-chat.component.html',
  styleUrl: './live-chat.component.scss'
})
export class LiveChatComponent {

  private chatPopupElement: HTMLElement | null = null;

  private getChatPopupElement(): HTMLElement | null {
    if (!this.chatPopupElement) {
      this.chatPopupElement = document.querySelector('.chat-message-popup');
    }
    return this.chatPopupElement;
  }

  livechat(): void {
    this.getChatPopupElement()?.classList.add('active');
  }

  fullscreen(): void {
    this.getChatPopupElement()?.classList.toggle('card-fullscreen');
  }

  closeChat(): void {
    this.getChatPopupElement()?.classList.add('popup-endchat');
  }

  chatEnd(): void {
    const element = this.getChatPopupElement();
    if (element) {
      element.classList.remove('popup-endchat');
      element.classList.add('rating-section-body');
    }
  }

  goBack(): void {
    this.getChatPopupElement()?.classList.remove('popup-endchat');
  }

  submitResponse(): void {
    this.getChatPopupElement()?.classList.remove('active');
  }

  ngOnDestroy(): void {
    const element = this.getChatPopupElement();
    if (element) {
      // Remove all classes that might have been added
      element.classList.remove('active', 'card-fullscreen', 'popup-endchat', 'rating-section-body');
    }
  }

}

import {insertAfter} from '../helpers/insertHelpers';
import {render} from 'preact';
import React from 'preact/compat';
import NotificationPopup from '../components/NotificationPopup/NotificationPopup';

export default class DisplayManager {
  constructor() {
    this.notifications = [];
    this.settings = {};
  }

  initialize = async ({notifications, settings}) => {
    const currentUrl = window.location.href;
    const {allowShow, includedUrls, excludedUrls} = settings;
    this.insertContainer();
    if (
      !this.checkIncludedAvalible({
        allowShow,
        includedUrls,
        excludedUrls,
        currentUrl
      })
    )
      return;

    return await this.showPopup({
      notifications,
      settings,
      display: this.display,
      fadeOut: this.fadeOut,
      timeout: this.timeout
    });
  };

  fadeOut() {
    const container = document.querySelector('#Avada-SalePop');
    container.innerHTML = '';
  }

  display(data) {
    const container = document.querySelector('#Avada-SalePop');
    render(<NotificationPopup {...data} />, container);
  }

  insertContainer() {
    const popupEl = document.createElement('div');
    popupEl.id = `Avada-SalePop`;
    popupEl.classList.add('Avada-SalePop__OuterWrapper');
    const targetEl = document.querySelector('body').firstChild;
    if (targetEl) {
      insertAfter(popupEl, targetEl);
    }

    return popupEl;
  }

  timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms * 1000));
  }

  async showPopup({notifications, settings, display, fadeOut, timeout}) {
    const {
      truncateProductName,
      firstDelay,
      hideTimeAgo,
      position,
      displayDuration,
      popsInterval,
      maxPopsDisplay
    } = settings;

    notifications = notifications.slice(0, maxPopsDisplay);
    // notifications = notifications.sort(() => Math.random() - 0.5);

    await timeout(firstDelay);
    for (const notification of notifications) {
      const data = {
        ...notification,
        truncateProductName,
        hideTimeAgo,
        position
      };
      display(data);
      await timeout(displayDuration);
      fadeOut();
      await timeout(popsInterval);
    }
  }

  checkIncludedAvalible({allowShow, includedUrls, excludedUrls, currentUrl}) {
    let check = true;

    if (allowShow === 'specific') {
      if (!includedUrls.split('\n').includes(currentUrl)) check = false;
    }
    if (allowShow === 'all') {
      if (excludedUrls.split('\n').includes(currentUrl)) check = false;
    }

    return check;
  }
}

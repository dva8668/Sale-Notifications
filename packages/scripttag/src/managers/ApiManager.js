import makeRequest from '../helpers/api/makeRequest';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const currentUrl = window.location.href;
    const url = currentUrl.split('/')[2];
    const apiUrl = `https://localhost:3000/clientApi/notifications?shopifyDomain=${url}`;
    const {notifications, settings} = await makeRequest(apiUrl);

    return {notifications, settings};
  };
}

import {Firestore} from '@google-cloud/firestore';
import {checkIfExists} from '../helpers/checkIfExists';

const firestore = new Firestore();
const notificationCollection = firestore.collection('notifications');

export async function getNotification({key, value, sort}) {
  let type = 'desc';
  let field = 'timestamp';
  if (sort) {
    type = sort.split('_')[1].toLowerCase();
    field = sort.split('_')[0].toLowerCase();
  }
  const listNotifications = await notificationCollection
    .where(key, '==', value)
    .orderBy(field, type)
    .get();

  if (checkIfExists(listNotifications)) return;
  return listNotifications.docs.map(doc => {
    const time = doc.data().timestamp;
    return {
      ...doc.data(),
      timestamp: time.toDate(),
      order_id: doc.id
    };
  });
}

export async function addNotification({shopId, shopifyDomain, data}) {
  return notificationCollection.add({
    ...data,
    shopId: shopId,
    shopifyDomain: shopifyDomain
  });
}

export async function deleteAllNotification(notifications) {
  return Promise.all(
    notifications.docs.map(notification =>
      notificationCollection.doc(notification.id).delete()
    )
  );
}

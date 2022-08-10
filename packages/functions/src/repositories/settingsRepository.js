import {Firestore} from '@google-cloud/firestore';
import {checkIfExists} from '../helpers/checkIfExists';

const firestore = new Firestore();
const settingCollection = firestore.collection('settings');

export async function getSetting(shopID) {
  const settings = await settingCollection
    .where('shopId', '==', shopID)
    .limit(1)
    .get();

  if (checkIfExists(settings)) return;

  const doc = settings.docs[0];
  return {
    ...doc.data()
  };
}

export async function updatesSetting(shopID, requestData) {
  const settingsUpdates = await settingCollection
    .where('shopId', '==', shopID)
    .limit(1)
    .get();

  if (checkIfExists(settingsUpdates)) return;

  const updateSetting = settingsUpdates.docs[0];
  return settingCollection.doc(updateSetting.id).update({
    ...requestData
  });
}

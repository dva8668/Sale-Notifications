import {Firestore} from '@google-cloud/firestore';
import formatDateFields from '../helpers/formatDateFields';

const firestore = new Firestore();

/**
 * @documentation
 *
 * Only use one repository to connect to one collection, do not
 * try to connect more than one collection from one repository
 */
const collection = firestore.collection('COLLECTION_NAME');

/**
 *
 * @param {object} data
 * @returns {Promise<*>}
 */
export async function create(data) {
  const created = collection.add({...data, createdAt: new Date()});

  return created.id;
}

/**
 *
 * @param {string} id
 * @returns {Promise<*>}
 */
export async function removeOne(id) {
  return collection.doc(id).delete();
}

/**
 *
 * @param {string} id
 * @returns {Promise<*&{id}>}
 */
export async function getOneById(id) {
  const doc = await collection.doc(id).get();

  return {
    id: doc.id,
    ...formatDateFields(doc.data())
  };
}

/**
 *
 * @param {string} shopId
 * @returns {Promise<*>}
 */
export async function getAll(shopId) {
  const docs = await collection.where('shopId', '==', shopId).get();

  return docs.docs.map(doc => ({
    id: doc.id,
    ...formatDateFields(doc.data())
  }));
}

/**
 *
 * @param {string} id
 * @param {object} data
 * @returns {Promise<void>}
 */
export async function update(id, data) {
  return collection.doc(id).update(data);
}

/**
 *
 * @param {string} shopId
 * @returns {Promise<*>}
 */
export async function getFirst(shopId) {
  const docs = await collection
    .where('shopId', '==', shopId)
    .limit(1)
    .get();
  if (docs.empty) {
    return null;
  }
  const doc = docs[0];

  return {...formatDateFields(doc.data()), id: doc.id};
}

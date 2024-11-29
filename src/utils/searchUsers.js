import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';

const capitalize = (text) =>
  text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();

export const searchUser = async function (queryText) {
  const queryLowered = queryText.toLowerCase();
  const queryCapitalized = capitalize(queryText);

  try {
    const usersCollection = collection(db, 'users');

    const lowerCaseQuery = query(
      usersCollection,
      where('name', '>=', queryLowered),
      where('name', '<=', queryLowered + '\uf8ff')
    );

    const capitalizedQuery = query(
      usersCollection,
      where('name', '>=', queryCapitalized),
      where('name', '<=', queryCapitalized + '\uf8ff')
    );

    const [lowerSnapshot, capitalizedSnapshot] = await Promise.all([
      getDocs(lowerCaseQuery),
      getDocs(capitalizedQuery),
    ]);

    const result = new Map();
    lowerSnapshot.forEach((doc) => result.set(doc.id, doc.data()));
    capitalizedSnapshot.forEach((doc) => result.set(doc.id, doc.data()));

    const uniqueResults = Array.from(result.values());

    return uniqueResults;
  } catch (error) {
    console.error(error.message);
    return [];
  }
};

import { collection, doc, getDocs, setDoc, type DocumentData } from 'firebase/firestore'

import { firestore } from '@/config/firebase'
import { type CloudformData } from '@/interface/cloudformData.interface'

export const getCloudForm = async () => {
  const querySnapshot = await getDocs(collection(firestore, 'cloud-form'))

  let result: DocumentData | null = null
  querySnapshot.forEach((doc) => {
    if (doc.id === 'mikey') result = doc.data()
  })
  return result
}

export const setCloudForm = async (cloudformData: CloudformData) => {
  const cloudFormRef = collection(firestore, 'cloud-form')
  await setDoc(doc(cloudFormRef, 'mikey'), cloudformData)
  getCloudForm()
}

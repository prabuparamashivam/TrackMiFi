const DB_NAME = 'trackmifi_db'
const DB_VERSION = 2

let dbInstance = null

/**
 * Open IndexedDB connection
 */
export function openDB() {
  return new Promise((resolve, reject) => {
    if (dbInstance) {
      resolve(dbInstance)
     return
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      console.log('🔥 onupgradeneeded fired', event.oldVersion, '→', event.newVersion)
      const db = event.target.result

      // Existing transactions store
      if (!db.objectStoreNames.contains('transactions')) {
        const store = db.createObjectStore('transactions', {
          keyPath: 'id',
          autoIncrement: true,
        })

        store.createIndex('type', 'type', { unique: false })
        store.createIndex('date', 'date', { unique: false })
      }

      // ✅ NEW expected_expenses store
      if (!db.objectStoreNames.contains('expected_expenses')) {
        const store = db.createObjectStore('expected_expenses', {
          keyPath: 'id',
          autoIncrement: true,
        })

        store.createIndex('month', 'month', { unique: false })
        store.createIndex('year', 'year', { unique: false })
        store.createIndex('category', 'category', { unique: false })
      }
    }


request.onsuccess = () => {
  dbInstance = request.result

  // 🔥 VERY IMPORTANT
  dbInstance.onversionchange = () => {
    dbInstance.close()
    dbInstance = null
  }

  resolve(dbInstance)
}

  })
}

/**
 * Get object store with transaction
 */
export async function getStore(storeName, mode = 'readonly') {
  const db = await openDB()
  const tx = db.transaction(storeName, mode)
  return tx.objectStore(storeName)
}

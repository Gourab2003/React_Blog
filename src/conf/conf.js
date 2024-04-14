const conf = {
    AppwriteURL : String(import.meta.env.VITE_APPWRITE_API_ENDPOINT),
    AppwriteProjectId : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    AppwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    AppwriteCollectionId : String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    AppwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID)
}
export default conf;

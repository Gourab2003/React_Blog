import conf from "../conf/conf.js";

import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Datbaseservice{
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.AppwriteURL)
            .setProject(conf.AppwriteProjectId);
            this.account = new Account(this.client);
            this.databases = new Databases(this.client);
            this.bucket = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImages, status, userId}){
            try {
                return await this.databases.createDocument(
                    conf.AppwriteDatabaseId,
                    conf.AppwriteCollectionId,
                    slug,
                    {
                        title,
                        content,
                        featuredImages,
                        status,
                        userId
                    }
                )
            } catch (error) {
                console.log("appwrite server create Post error: " + error);
            }
    }

    async updatePost(slug, {title, content, featuredImages, status}) {
        try {
            return await this.databases.updateDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImages,
                    status
                }
            )
        } catch (error) {
            console.log("appwrite server update Post error: " + error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("App write server delete Post error: " + error);
            return false;
        }
    }

    async getPost(querys = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(
                conf.AppwriteDatabaseId,
                conf.AppwriteCollectionId,
                querys
            )
        } catch (error) {
            console.log("App write server getPost error: " + error);
            return false;
        }
    }

    // file uploder service 

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.AppwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite uploadFile error: "+error);
        }
    }

    async deleteFile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.AppwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("appwrite deletefile error:" +error);
        }
    }

    fielPreview(fileId){
        try {
            return this.bucket.getFilePreview(
                conf.AppwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite file preview error: "+error);
        }
    }
}

const DatabaseService = new Datbaseservice();

export default DatabaseService;

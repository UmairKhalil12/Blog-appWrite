import configure from "../config/configure";
import { Client, ID, Query, Storage, Databases } from "appwrite";

export class Service {

    client = new Client()
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(configure.appWriteUrl)
            .setProject(configure.appWriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                configure.appWriteDatabaseId,
                configure.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    createdAt: new Date().getTime()
                }
            )

        } catch (error) {
            console.log("error creating post", error.message);
            throw error;
            return false;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                configure.appWriteDatabaseId,
                configure.appWriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }
        catch (error) {
            console.log("error updating post", error.message);
            throw error;
            return false;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                configure.appWriteDatabaseId,
                configure.appWriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log("error deleting post", error.message);
            throw error;
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                configure.appWriteDatabaseId,
                configure.appWriteCollectionId,
                slug
            )

        } catch (error) {
            console.log("error getting single post", error.message);
            throw error;
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                configure.appWriteDatabaseId,
                configure.appWriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("error all post (list documents)", error);
            throw error;
            return false;
        }
    }

    // ---------------- file upload method ------------------ //
    async uploadFile({ file }) {
        try {
            return await this.storage.createFile(
                configure.appWriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log('error uploading file', error.message)
            throw error
            return false;
        }
    }


    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                configure.appWriteBucketId,
                fileId,
            )
            return true

        } catch (error) {
            console.log('error deleting file', error.message);
            throw error;
            return false;
        }
    }

    getFilePreview(fileId) {
        try {
            return this.storage.getFilePreview(
                configure.appWriteBucketId,
                fileId
            )

        } catch (error) {
            console.log("Error getting preview:", error);
            throw error;
            return false;
        }
    }

}

const service = new Service()

export default service
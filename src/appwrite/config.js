import { errorSelector } from 'recoil';
import conf from '../conf/conf'
import { Client, Account, ID ,Databases,Storage,Query} from "appwrite";
import { queries } from '@testing-library/react';


export class Service{
    client = new Client();
    databases;
    bucket;
    constructor(){
        this.client
            .setEndpoint(conf.appwriteurl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createquiz({UserID,slug,Questions,Status,code}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    UserID,
                    slug,
                    Questions,
                    Status,
                    code,
                }
            )
        } catch (error) {
            throw error;
        }
    }
    async updatequiz(slug,{Questions,Status,code}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                {
                    Questions,
                    slug,
                    Status,
                    code,                }
                )
        } catch (error) {
            throw error;
        }
    }
    async deletequiz(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            throw error;
        }
    }
    async getquiz(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            throw error
        }
    }
    async getquizs(queries =[Query.equal("status",'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            throw error
        }
    }
    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            throw error
        }
    }
    async deletefile(fileId){
        try {
            return await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            throw error
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }
    
}

const service = new Service()

export default service
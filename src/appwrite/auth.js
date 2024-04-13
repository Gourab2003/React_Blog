import conf from "../conf/conf.js";

import { Client, Account, ID } from "appwrite";

export class AuthService{
    Client = new Client();
    account;

    constructor() {
        this.Client
            .setEndpoint(conf.AppwriteURL)
            .setProject(conf.AppwriteProjectId);
            this.account = new Account(this.Client)
    }

    async CreateAccount({email, password, name}){
        try {
            const userAccount =  await this.account.create(ID.unique(), email, password, name);
            if (userAccount){
                // call another method if account found then directly login to the application
                return this.login({email, password})
            }else{
                return userAccount;
            }
        } catch (error) {
            throw new Error(error)
        }
    };

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password)
        } catch (error) {
            throw new Error(error)
        }
    };

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite services :: logout :: error", error);
        }
    };

    async getCurrentUser (){
        try {
            return await this.account.get();
        } catch (error) {
            console.error(error)
        }
        return null;
    }
}


const authService = new AuthService();

export default authService;
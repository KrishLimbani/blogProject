import conf from '../conf/conf'
import {client, account, ID} from 'appwrite';

export class AuthService {
    client = new client()
    account;

    constructor(){
        this.client
            .setProject(conf.appwriteProjectId)
            .setEndPoint(conf.appwriteUrl)
        this.account = new account(this.client);
    }

    // create new account method
    async createAccount({email, password, name}){
        try{
            const user = await this.account.create(ID.unique(), email, password, name)
            if(user){
                // call another method
                return this.login({email, password})
            }else{
                return user;
            }
        }catch(error){
            throw error;
        }
    }

    // login method
    async login({email, password}){
        try{
            return await this.account.createEmailPasswordSession(email, password)
        }catch(error){
            throw error;
        }
    }

    // check user login or not
    async getCurrentuser(){
        try{
            return await this.account.get()
        }catch(error){
            console.log("Appwrite service :: getCurrentuser :: error :: ", error)
        }
        return null;
    }

    
    async logout(){
        try{
            return await this.account.deleteSessions()
        }catch(error){
            throw error;
        }
    }
}

const authService = new AuthService();

export default authService;
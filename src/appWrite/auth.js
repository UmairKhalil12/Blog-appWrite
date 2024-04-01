import configure from "../config/configure";
import { Account, Client, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(configure.appWriteUrl)
            .setProject(configure.appWriteProjectId);
        this.account = new Account(this.client)
    }

    async CreateAccount({ email, password, name }) {
        try {
            const userAcoount = await this.account.create(ID.unique(), email, password, name);
            if (userAcoount) {
                return this.Login(email, password)
            }
            else {
                return
            }
        } catch (error) {
            throw error
            console.log(error.message);

        }
    }

    async Login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
        }
        catch (error) {
            throw error;
            console.log(error.message);
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
            console.log(error.message);
        }
        return null
    }

    async Logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Error on logout: ", error.message);
        }
    }
}


const authService = new AuthService();

export default authService;
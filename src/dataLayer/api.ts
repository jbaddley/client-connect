import { SignUpFormValues } from "../components/signUpForm"
import { BaseAPI } from './baseApi'

type APIResponse<T> = {
    data?: T,
    status: string,
    message?: string
}

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    username: string;
}

export type CompanyType = {
    id: number;
    name: string;
    description: string;
    email: string;
    address: string;
    phone: string;
}

function getConnectedCompaniesFromStorage() {
    const connectedCompaniesJSON = window.localStorage.getItem('connected-companies');
    let connectedCompanies = {} as any
    if (connectedCompaniesJSON) {
        connectedCompanies = JSON.parse(connectedCompaniesJSON)
    }
    return connectedCompanies
}

export default class API {
    static async signUp(formValues: SignUpFormValues):Promise<APIResponse<any>> {
        return BaseAPI.post('/sign-up', formValues)
    }

    static login(username: string, password: string):Promise<APIResponse<UserType>> {
        return BaseAPI.post("/login", { username, password })
    }

    static getCompanies(): Promise<APIResponse<CompanyType[]>> {
        return BaseAPI.get("/companies")
    }

    static getConnectedCompanies(userId: string): Promise<APIResponse<number[]>> {
        return BaseAPI.get(`/connected-companies/${userId}`)
    }

    static connectToCompany(username: string, companyId: number): Promise<APIResponse<number[]>> {
        return BaseAPI.post(`/connected-companies/${username}/${companyId}`)
    }

    static disconnectFromCompany(username: string, companyId: number): Promise<APIResponse<number[]>> {
        return BaseAPI.delete(`/connected-companies/${username}/${companyId}`)
    }
}

import HttpClient from './HttpClient';
import axios from "axios";
import {refreshToken} from "../redux/actions";

export interface SignUpLoginBody {
  email: string;
  password: string;
}

interface  LoginResponse {
  body: {
    access_token:string,
    refresh_token:string,
  }
  statusCode: number,

}

class MainApi extends HttpClient {
  private static instanceCached: MainApi;

  private constructor() {
    super('http://142.93.134.108:1111/');
  }

  static getInstance = () => {
    if (!MainApi.instanceCached) {
      MainApi.instanceCached = new MainApi();
    }

    return MainApi.instanceCached;
  };

  public signUp = (body: SignUpLoginBody) => this.instance.post<{ message: string }>('/sign_up', body);
  public login = (body: SignUpLoginBody) => this.instance.post<LoginResponse>(`login?email=${body.email}&password=${body.password}`);
}


export default MainApi;

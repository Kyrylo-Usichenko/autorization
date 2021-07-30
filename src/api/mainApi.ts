import HttpClient from './HttpClient';

export interface SignUpLoginBody {
  email: string;
  password: string;
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
  public login = (body: SignUpLoginBody) => this.instance.post<{ message: string }>(`login?email=${body.email}&password=${body.password}`);
}

export default MainApi;

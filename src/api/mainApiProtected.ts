import HttpClientProtected from './HttpClientProtected';

export interface SignUpBody {
  email: string;
  password: string;
}

class MainApiProtected extends HttpClientProtected {
  private static instanceCached: MainApiProtected;

  private constructor() {
    super('http://142.93.134.108:1111/');
  }

  static getInstance = () => {
    if (!MainApiProtected.instanceCached) {
      MainApiProtected.instanceCached = new MainApiProtected();
    }

    return MainApiProtected.instanceCached;
  };

}

export default MainApiProtected;

import { AxiosRequestConfig } from 'axios';
import HttpClient from './HttpClient';

abstract class HttpClientProtected extends HttpClient{
  public constructor(baseURL: string) {
    super(baseURL)

    this.initializeRequestInterceptor();
  }

  private initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this.handleRequest);
  };

  private handleRequest = (config: AxiosRequestConfig) => {
    const token = window.sessionStorage.getItem('Access_tokenData');

    const updatedConfig = config;

    updatedConfig.headers.Authorization = `Bearer ${token}`

    return updatedConfig
  };

}

export default HttpClientProtected;

import { useEffect } from 'react';
import { axiosPrivate } from '../../api/axios';


export function useAxiosPrivate() {
  

  useEffect(() => {

   

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error)
      }
    );

    return () => {
      
      axiosPrivate.interceptors.response.eject(responseIntercept);
    }

  })

  return axiosPrivate;
}

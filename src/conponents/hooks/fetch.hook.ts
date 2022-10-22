import { useState, useContext, useCallback } from 'react';
import {TodoContext} from '../../App'


export const useHttp = () => {
  const [error, setError] = useState<null | Error>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const {isAuthorized} = useContext(TodoContext);

  const request = useCallback(async(url: string, method: string = 'GET', body: string | null = null, headers: HeadersInit = {})=>{
    try {
      if (body) {
        headers = Object.assign(headers, {'Content-Type': 'application/json'});
      }
      const response = await fetch(`http://localhost:4500/api/${url}`, {method, body, headers})
      console.log(headers)
      console.log(response)
      const data = await response.json();
      if (!response.ok) {
        if(response.statusText === 'Unauthorized') {
          isAuthorized[1](false)
        }
        console.log(response.statusText)
      }
      if(data.token){
        localStorage.setItem('user', JSON.stringify(data));
        isAuthorized[1](true)
      }
      setIsLoaded(true)
      return data
    } catch (error: any) {
      setIsLoaded(false)
      setError(error.message as Error)
      throw error
    }

  },[isAuthorized]);

  const clearError = useCallback(() => setError(null), [])
  
return { isLoaded, request, error, clearError }
}

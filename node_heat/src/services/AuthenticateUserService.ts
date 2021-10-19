import axios from  'axios'
import { response } from 'express';
/**
 * Receber code(string)
 * Recuperar acess_token do github
 * recuperar infos do user no github
 * verificar se o usuario existe no banco de dados
 * se sim gera um token pra ele
 * se n existir cria no db e gera um token
 * retorna o token com infos do user
 */

interface IAcessTokenResponse{
  access_token: string;
}

interface UIserResponse {
  avatar_url: string,
  login: string,
  id: number,
  name: string
}

class AuthenticateUserService {
  async execute(code:string) {
    const url = "https://github.com/login/oauth/access_token";
    const { data: acessTokenResponse } = await axios.post<IAcessTokenResponse>(url, null, {
      params: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      headers: {
        "Accept": "application/json"
      }
    })
    const response = await axios.get<UIserResponse>("https://api.github.com/user", {
      headers: {
        authorization: `Bearer ${acessTokenResponse.access_token}`
      }
    })
    
    return response.data
  }
}

export { AuthenticateUserService }
import { cookiesOptions } from "./type";

/**
 * Gestionnaire de cookies
 */
export class cookies{

    static set(name:string, value, exdays,options:cookiesOptions){

      const d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      let expires = "expires=" + d.toUTCString();
  
      const secureState = options?.secureState || "Secure;"
      const sameSite = options?.sameSite || "None"; // None pour partage inter-sites
      const domain = "domain=" + options?.domain || ""; // Définition du domaine
  
      document.cookie = `${name}=${value}; ${expires}; path=/; ${domain}; SameSite=${sameSite}; ${secureState}`;
    }
  
    static get(cookieName){
      let name = cookieName + "=";
      let decodedCookie = decodeURIComponent(document.cookie);
      let ca = decodedCookie.split(';');
      for(let i = 0; i <ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
          c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
        }
      }
      return "";
    }
  
    static async reset(name,options:cookiesOptions) {
      // const domain = `domain=${import.meta.env.VITE_DOMAIN_NAME}`
      // document.cookie = name + `=; expires=Fri, 10 Jul 2023 16:20:15 GMT;path=/; ${domain} SameSite=None; Secure;`;
  
      const domain = options?.domain || ""; // Récupérer le domaine configuré
      document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}; SameSite=None; Secure`;
    }
  
  }
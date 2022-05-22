import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  public get(key: string):any {
    const data: string | null = localStorage.getItem(key)
    
    if (data) {
      return JSON.parse(data)
    }
    
    return null
  }

  public add(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value))
  } 
  
  public delete(key: string): void {
    localStorage.removeItem(key);
  }
}
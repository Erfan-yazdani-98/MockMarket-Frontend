import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductRequest } from '../models/dto/product-request';
import { ProductResponse } from '../models/dto/product-response';
import { Observable } from 'rxjs';
import { FilterListResponse } from '../models/dto/filter-list-response';
import { Product } from '../models/product';
import { User } from '../models/user';
import { Bookmark } from '../models/bookmark';
import { UserService } from './user.service';
import { Like } from '../models/like';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  // private baseUrl: string = "http://localhost:8090";
  // private baseUrl: string = 'http://207.154.219.47:8090';
  // private baseUrl: string = 'http://app:8080'; // Using service name defined in docker-compose.yml
  private baseUrl: string;

  constructor(
    private httpClient: HttpClient,
    private userService: UserService
  ) {
    if (window.location.hostname === 'localhost') {
      this.baseUrl = 'http://localhost:8090'; // For local development
    } else {
      this.baseUrl = 'http://207.154.219.47:8090'; // Update for your server's IP for production environment
    }
  }

  getPosts(request: ProductRequest): Observable<ProductResponse> {
    return this.httpClient.post<ProductResponse>(
      `${this.baseUrl}/products`,
      request
    );
  }
  getFirstPageProducts(path: String): Observable<ProductResponse> {
    return this.httpClient.get<ProductResponse>(`${this.baseUrl}/${path}`);
  }
  getFilterList(request: ProductRequest): Observable<FilterListResponse> {
    return this.httpClient.post<FilterListResponse>(
      `${this.baseUrl}/filterlist`,
      request
    );
  }
  getProductById(id: String): Observable<Product> {
    return this.httpClient.get<Product>(`${this.baseUrl}/products/${id}`);
  }

  register(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users/register`, user);
  }
  login(user: User): Observable<User> {
    return this.httpClient.post<User>(`${this.baseUrl}/users/login`, user);
  }
  getBookmark(userId: number, productId: number): Observable<Bookmark> {
    const headers: HttpHeaders = this.getHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString());
    return this.httpClient.get<Bookmark>(`${this.baseUrl}/bookmarks`, {
      params,
      headers,
    });
  }
  setBookmark(
    userId: number,
    productId: number,
    isBookmarked: boolean
  ): Observable<Bookmark> {
    const headers: HttpHeaders = this.getHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString())
      .set('isBookmarked', isBookmarked);
    const body = {};
    return this.httpClient.post<Bookmark>(`${this.baseUrl}/bookmarks`, body, {
      params,
      headers,
    });
  }

  getLike(userId: number, productId: number): Observable<Like> {
    const headers: HttpHeaders = this.getHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString());
    return this.httpClient.get<Like>(`${this.baseUrl}/likes`, {
      params,
      headers,
    });
  }
  setLike(
    userId: number,
    productId: number,
    isLiked: boolean
  ): Observable<Like> {
    const headers: HttpHeaders = this.getHeaders();
    const params = new HttpParams()
      .set('userId', userId.toString())
      .set('productId', productId.toString())
      .set('isLiked', isLiked);
    const body = {};
    return this.httpClient.post<Like>(`${this.baseUrl}/likes`, body, {
      params,
      headers,
    });
  }
  getUserPageProducts(
    path: String,
    userId: number
  ): Observable<ProductResponse> {
    const headers: HttpHeaders = this.getHeaders();
    const params = new HttpParams().set('userId', userId.toString());
    return this.httpClient.get<ProductResponse>(`${this.baseUrl}/${path}`, {
      params,
      headers,
    });
  }

  getHeaders(): HttpHeaders {
    let user: User = this.userService.getUserValue() || new User('', '', '', 0);

    // Correctly check user ID
    if (user.id === 0) return new HttpHeaders(); // Return empty headers if user ID is 0

    // Log username and password for debugging
    console.log(
      'Header UserName: ' + user.username + ' Password: ' + user.password
    );

    // Clean username and password, remove quotes and trim spaces
    let username = user.username.replace(/"/g, '').trim();
    let password = user.password.replace(/"/g, '').trim();

    // Ensure username and password are not empty
    if (!username || !password) {
      return new HttpHeaders(); // Return empty headers if username or password is missing
    }

    // Construct credentials
    let cred: string = `${username}:${password}`;

    // Log raw credentials before encoding
    console.log('Raw Credentials: ' + cred);

    // Create headers with Base64 encoded credentials
    const headers = new HttpHeaders({
      Authorization: 'Basic ' + btoa(cred),
    });

    // Log the headers for debugging
    console.log('Logged Headers: ', this.logHeaders(headers)); // Properly log the headers
    return headers;
  }

  logHeaders(headers: HttpHeaders): { [key: string]: string | null } {
    // Create a plain object to capture headers for logging
    const headersMap = headers.keys().reduce((acc, key) => {
      acc[key] = headers.get(key); // Get each header value
      return acc;
    }, {} as { [key: string]: string | null });

    return headersMap; // Return the formatted headers
  }
}

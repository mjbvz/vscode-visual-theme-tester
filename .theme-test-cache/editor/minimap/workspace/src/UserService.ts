import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { User, UserProfile, CreateUserRequest } from './models/user.model';
import { ApiResponse } from './models/api.model';
import { LoggerService } from './logger.service';
import { ConfigService } from './config.service';

/**
 * UserService handles all user-related operations including
 * authentication, profile management, and user data retrieval.
 * 
 * This service provides methods for:
 * - Creating new users
 * - Retrieving user profiles
 * - Updating user information
 * - Managing user sessions
 * - Handling user preferences
 */
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly API_BASE_URL: string;
  private readonly currentUserSubject = new BehaviorSubject<User | null>(null);
  public readonly currentUser$ = this.currentUserSubject.asObservable();
  
  // Cache for frequently accessed user data
  private userCache = new Map<string, User>();
  private readonly CACHE_EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

  constructor(
    private http: HttpClient,
    private logger: LoggerService,
    private config: ConfigService
  ) {
    this.API_BASE_URL = this.config.getApiBaseUrl();
    this.logger.info('UserService initialized');
  }

  /**
   * Creates a new user account with the provided information
   * @param userData - The user data for account creation
   * @returns Observable containing the created user information
   */
  public createUser(userData: CreateUserRequest): Observable<User> {
    const url = `${this.API_BASE_URL}/users`;
    
    this.logger.debug('Creating new user', { email: userData.email });
    
    return this.http.post<ApiResponse<User>>(url, userData).pipe(
      map(response => response.data),
      tap(user => {
        this.logger.info('User created successfully', { userId: user.id });
        this.userCache.set(user.id, user);
      }),
      catchError(this.handleError.bind(this)),
      retry(2)
    );
  }

  /**
   * Retrieves a user profile by ID
   * First checks cache, then makes API call if not found
   */
  public getUserById(userId: string): Observable<User> {
    // Check cache first
    const cachedUser = this.userCache.get(userId);
    if (cachedUser && this.isCacheValid(cachedUser)) {
      this.logger.debug('Returning cached user data', { userId });
      return new Observable(observer => {
        observer.next(cachedUser);
        observer.complete();
      });
    }

    const url = `${this.API_BASE_URL}/users/${userId}`;
    
    return this.http.get<ApiResponse<User>>(url).pipe(
      map(response => response.data),
      tap(user => {
        this.userCache.set(userId, { ...user, _cacheTime: Date.now() });
        this.logger.debug('User data retrieved and cached', { userId });
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Updates user profile information
   * Invalidates cache for the updated user
   */
  public updateUserProfile(userId: string, profileData: Partial<UserProfile>): Observable<User> {
    const url = `${this.API_BASE_URL}/users/${userId}/profile`;
    
    this.logger.debug('Updating user profile', { userId, fields: Object.keys(profileData) });
    
    return this.http.patch<ApiResponse<User>>(url, profileData).pipe(
      map(response => response.data),
      tap(user => {
        // Update cache with new data
        this.userCache.set(userId, { ...user, _cacheTime: Date.now() });
        
        // Update current user if it's the same user
        const currentUser = this.currentUserSubject.value;
        if (currentUser && currentUser.id === userId) {
          this.currentUserSubject.next(user);
        }
        
        this.logger.info('User profile updated successfully', { userId });
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Searches for users based on query parameters
   * Supports pagination and filtering
   */
  public searchUsers(query: string, page: number = 1, limit: number = 20): Observable<User[]> {
    const url = `${this.API_BASE_URL}/users/search`;
    const params = { query, page: page.toString(), limit: limit.toString() };
    
    this.logger.debug('Searching users', { query, page, limit });
    
    return this.http.get<ApiResponse<User[]>>(url, { params }).pipe(
      map(response => response.data),
      tap(users => {
        // Cache the search results
        users.forEach(user => {
          this.userCache.set(user.id, { ...user, _cacheTime: Date.now() });
        });
        this.logger.debug('Search completed, cached results', { count: users.length });
      }),
      catchError(this.handleError.bind(this))
    );
  }

  /**
   * Sets the current authenticated user
   * This method is typically called after successful login
   */
  public setCurrentUser(user: User): void {
    this.currentUserSubject.next(user);
    this.userCache.set(user.id, { ...user, _cacheTime: Date.now() });
    this.logger.info('Current user set', { userId: user.id, email: user.email });
  }

  /**
   * Clears the current user session
   * Removes user from memory and clears cache
   */
  public clearCurrentUser(): void {
    const currentUser = this.currentUserSubject.value;
    this.currentUserSubject.next(null);
    
    if (currentUser) {
      this.userCache.delete(currentUser.id);
      this.logger.info('Current user cleared', { userId: currentUser.id });
    }
  }

  /**
   * Checks if cached user data is still valid
   * @param user - User object with cache timestamp
   * @returns true if cache is valid, false otherwise
   */
  private isCacheValid(user: any): boolean {
    if (!user._cacheTime) return false;
    return (Date.now() - user._cacheTime) < this.CACHE_EXPIRY_MS;
  }

  /**
   * Handles HTTP errors and transforms them into user-friendly messages
   * @param error - The HTTP error response
   * @returns Observable that throws a formatted error
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Bad Request: Please check your input data';
          break;
        case 401:
          errorMessage = 'Unauthorized: Please log in again';
          break;
        case 403:
          errorMessage = 'Forbidden: You do not have permission for this action';
          break;
        case 404:
          errorMessage = 'User not found';
          break;
        case 409:
          errorMessage = 'Conflict: User already exists';
          break;
        case 500:
          errorMessage = 'Server Error: Please try again later';
          break;
        default:
          errorMessage = `Error ${error.status}: ${error.message}`;
      }
    }
    
    this.logger.error('UserService error', { error: errorMessage, status: error.status });
    return throwError(errorMessage);
  }

  /**
   * Cleanup method to clear cache and subscriptions
   * Should be called when the service is destroyed
   */
  public cleanup(): void {
    this.userCache.clear();
    this.logger.info('UserService cleanup completed');
  }
}
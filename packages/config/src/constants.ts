/**
 * Application-wide constants
 */

export const APP_NAME = 'AppHub';
export const APP_DESCRIPTION = 'Web platform for app distribution and management';

/**
 * File upload configuration
 * These are global defaults as per operational_spec.md
 */
export const UPLOAD_LIMITS = {
    MAX_FILE_SIZE: 2 * 1024 * 1024 * 1024, // 2GB default
    MAX_FILES_PER_UPLOAD: 10,
    ALLOWED_FILE_TYPES: ['.apk', '.exe', '.zip', '.msi', '.pdf'],
} as const;

/**
 * URL configuration
 */
export const URLS = {
    HOME: '/',
    NOT_FOUND: '/404',
} as const;

/**
 * Storage configuration
 */
export const STORAGE = {
    BUCKET_NAME: 'apps',
    SIGNED_URL_TTL: 3600, // 1 hour default
} as const;

/**
 * Security headers
 */
export const SECURITY_HEADERS = {
    CSP: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline';",
    X_FRAME_OPTIONS: 'DENY',
    X_CONTENT_TYPE_OPTIONS: 'nosniff',
    REFERRER_POLICY: 'strict-origin-when-cross-origin',
} as const;

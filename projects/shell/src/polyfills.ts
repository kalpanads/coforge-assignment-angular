/**
 * Polyfill for import.meta.url
 *
 * This is needed for some environments where import.meta.url is not supported.
 * It provides a fallback to a global variable that can be set by the build process.
 */
if (typeof (window as any).__import_meta_url__ === 'string') {
  (window as any).import = (window as any).import || {};
  (window as any).import.meta = (window as any).import.meta || {};
  (window as any).import.meta.url = (window as any).__import_meta_url__;
}

// Zone.js is required by Angular
import 'zone.js';

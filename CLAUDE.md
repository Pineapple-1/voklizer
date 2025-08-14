# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `pnpm dev` or `npm run dev` - Starts Vite development server with HMR
- **Production build**: `pnpm build` or `npm run build` - Creates optimized production build
- **Linting**: `pnpm lint` or `npm run lint` - Runs ESLint with React-specific rules
- **Preview**: `pnpm preview` or `npm run preview` - Preview production build locally

## Mobile Development Commands

- **Build for mobile**: `pnpm phone-build` - Builds project and copies to Capacitor
- **Sync Capacitor**: `pnpm sync` - Syncs web assets and native dependencies
- **Open Android**: `pnpm open-android` - Opens project in Android Studio
- **Open iOS**: `pnpm open-ios` - Opens project in Xcode

## Architecture Overview

### Tech Stack
- **Framework**: React 18 with Vite build tool
- **Mobile**: Ionic React with Capacitor for native mobile functionality
- **UI**: TailwindCSS with custom design system (purple theme, Lexend font)
- **State Management**: Jotai for global state + SWR for server state caching
- **Authentication**: Firebase Auth + custom JWT tokens
- **Payments**: Stripe integration via Capacitor plugin
- **Storage**: Ionic Storage for local data persistence

### Project Structure

#### Core Application Files
- `src/App.jsx` - Main app component with routing and Capacitor plugin setup
- `src/main.jsx` - Entry point with SWR configuration and storage initialization
- `src/routes.jsx` - Lazy-loaded route components using @loadable/component
- `src/state.js` - Global Jotai atoms (user, FCM token, audio state)
- `src/storage.js` - Ionic Storage instance for local persistence
- `src/firebase.js` - Firebase configuration with platform-specific auth setup

#### Directory Organization
- `src/pages/` - Page components organized by feature area:
  - `auth/` - Authentication flow (login, register, password reset)
  - `home/` - Main user interface (Play page, landing, reel player)
  - `company/` - Service provider features (registration, query listing)
  - `profile/` - User profile and billing management
  - `voicebox/` - Voice message and reply management
  - `utils/` - Error pages and utility components
- `src/components/` - Reusable UI components (Loading, Sidebar, Textbox, etc.)
- `src/layout/` - Layout components (Base, UserHomeLayout, ServiceProviderRegistrationLayout)
- `src/assets/` - SVG icons and logos
- `src/axios/` - HTTP client configuration with auth interceptors
- `src/utils/` - Utility functions (Common.js, Payment.js)

### Key Integrations

#### Native Capabilities (via Capacitor)
- Voice recording with permission management
- Geolocation services
- Push notifications with FCM tokens
- Social login (Google, Facebook)
- File picker functionality
- Status bar and splash screen customization

#### External Services
- **Backend API**: `https://voklizer-dev-mfdkryshgq-nw.a.run.app/api/v1/`
- **Firebase**: Authentication, cloud storage, push notifications
- **Stripe**: Payment processing with Google Pay support
- **Google Cloud Storage**: File uploads and media storage

### State Management Patterns
- **SWR**: Server state caching with automatic revalidation
- **Jotai**: Atomic state management for client-side state
- **Ionic Storage**: Persistent local storage for tokens and user preferences
- **RxJS**: Observable patterns for token state management

### Authentication Flow
1. Initial token check from Ionic Storage
2. Firebase Auth for social login providers
3. Custom JWT tokens for API authentication
4. Automatic token refresh and 401 handling with redirect to login

### Mobile-Specific Considerations
- Status bar styling and background color management
- Platform-specific Firebase Auth initialization
- Voice recording permissions and audio handling
- Push notification registration and handling
- Native navigation and deep linking support

## Development Guidelines

### Environment Variables Required
- `VITE_STRIPE` - Stripe publishable key
- `VITE_FIREBASE_API_KEY` - Firebase configuration
- `VITE_FIREBASE_AUTH_DOMAIN` - Firebase auth domain
- `VITE_FIREBASE_PROJECT_ID` - Firebase project ID
- `VITE_FIREBASE_STORAGE_BUCKET` - Firebase storage bucket
- `VITE_FIREBASE_MESSAGING_SENDER_ID` - Firebase messaging sender ID
- `VITE_FIREBASE_APP_ID` - Firebase app ID
- `VITE_FIREBASE_MEASUREMENT_ID` - Firebase measurement ID

### Code Style
- Uses ESLint with React-specific rules (see `.eslintrc.cjs`)
- Consistent component structure with lazy loading
- TailwindCSS for styling with custom theme extensions
- Functional components with hooks pattern

### Testing and Deployment
- Mobile builds require Android Studio and Xcode setup
- Production keystore configured for Android builds
- Firebase configuration files required for iOS/Android builds
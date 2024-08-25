/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_YOUTUBE_API_KEY: string;
    readonly VITE_GOOGLE_SEARCH_API_KEY: string;
    readonly VITE_YOUTUBE_API_URI: string;
    readonly VITE_GOOGLE_SEARCH_API_URI: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
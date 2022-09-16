
import { makeResponsiveSize } from "./utilities.js";

export const ANIMATION_FEATURE_CONTAINER_DURATION = 900;
export const ANIMATION_FEATURE_DURATION = 600;

export const APP_PREFIX = 'CODE_BRUSH';

export const LARGE_SCREENS_BREAKPOINT = makeResponsiveSize(900);

export const PROGRAMMING_LANGUAGES_DATA = [
    {
        name: 'xml',
        extensions: ['xml'],
        editorModeName: 'application/xml',
        compilerURL: '/'
    },
    {
        name: 'html',
        extensions: ['html', 'htm'],
        editorModeName: 'text/html',
        compilerURL: 'https://www.programiz.com/html/online-compiler/'
    },
    {
        name: 'css',
        extensions: ['css'],
        editorModeName: 'text/css',
        compilerURL: 'https://www.programiz.com/html/online-compiler/'
    },
    {
        name: 'javascript',
        extensions: ['js'],
        editorModeName: 'text/javascript',
        compilerURL: 'https://www.programiz.com/javascript/online-compiler/'
    },
    {
        name: 'json',
        extensions: ['json'],
        editorModeName: 'application/x-json',
        compilerURL: '/'
    },
    {
        name: 'python',
        extensions: ['py'],
        editorModeName: 'text/x-python',
        compilerURL: 'https://www.programiz.com/python-programming/online-compiler/'
    },
    {
        name: 'golang',
        extensions: ['go'],
        editorModeName: 'text/x-go',
        compilerURL: 'https://replit.com/languages/go'
    },
    {
        name: 'ruby',
        extensions: ['rb'],
        editorModeName: 'text/x-ruby',
        compilerURL: 'https://replit.com/languages/ruby'
    },
];
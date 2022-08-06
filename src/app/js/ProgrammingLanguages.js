
const PROGRAMMING_LANGUAGES = new Map([
    [ 'xml' , 'application/xml' ],
    [ 'html' , 'text/html' ],
    [ 'css' , 'text/css' ],
    [ 'js' , 'text/javascript' ],
    [ 'json' , 'application/x-json' ],
    [ 'py' , 'text/x-python' ],
    [ 'go' , 'text/x-go' ],
    [ 'rb' , 'text/x-ruby' ]
]);

export default function ProgLanguages() { return PROGRAMMING_LANGUAGES; }
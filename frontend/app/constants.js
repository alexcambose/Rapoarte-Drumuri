const domain = ''; //root API domain name
export default {
    //trailing slash needed !
    SERVER_ROOT: `http://${domain}/`,
    SERVER_ADDR: `http://${domain}/api/`,
    //replace with your own keys
    googleAPIkey: '',
    googleMapsGeocodingAPIkey: '',

    googlePlaceSearch: 'https://maps.googleapis.com/maps/api/place/autocomplete/json',
    googleReverseGeocoding: 'https://maps.googleapis.com/maps/api/geocode/json',
    googleLang: 'ro',
    githubProject: 'https://github.com/alexcambose/Rapoarte-Drumuri',
    rssNewsUrl: 'http://www.mediafax.ro/rss',

    validate: {
        presence: 'nu poate fi gol',
        email: 'nu contine o adresa de email valida',
        equality: 'nu este la fel cu %{attribute}',
        length: {
            tooShort: 'trebuie sa contina cel putin %{count} caractere'
        }
    },
    validationErrors: {
        auth_invalid_credentials: "Emailul sau parola incorecta",
        auth_err_server: 'Conexiunea cu serverul nu s-a putut efectua.',
    }
}

export default function Interceptor() {
    let realFetch = window.fetch;
    window.fetch = async (url, opts) => {
        const token = localStorage.getItem('a');
        if (token) {
            opts.headers['Authorization'] = `Bearer ${token}`;
        }
        let updatedOpts = Object.assign({}, { credentials: 'same-origin' }, opts);
        return realFetch(url, updatedOpts);
    }
}
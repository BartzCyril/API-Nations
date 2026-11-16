// Same-origin by default (backend serves the built front); override with REACT_APP_API_URL
const API_URL = process.env.REACT_APP_API_URL ?? "";

export default API_URL;

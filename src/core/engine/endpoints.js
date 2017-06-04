
export const buildFetchAppsfromApi = (searchTerm) => ({
  url: 'https://data.42matters.com/api/v2.0/android/apps/search.json',
  params: {
    access_token: '447c10686ce94632d921e9c5f015c42974b2e792',
    q: searchTerm,
    lang: 'en',
    limit: 5
  }
});
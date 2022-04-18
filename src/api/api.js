const proxyCORS = 'https://api.allorigins.win/get?url=';

const host = proxyCORS + 'https://bnb.bg/Statistics/StExternalSector/StExchangeRates/StERForeignCurrencies/';


async function request(url, options) {
  try {
    const response = await fetch(host + url, options);

    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.json();
    }
  } catch (err) {
    alert(err.message);
    throw err;
  }
}

function createOptions(method = 'get', data) {
  const options = {
    method,    
    headers: {},
  };

  if (method == 'get') {
    options.headers['Content-Type'] = 'text/html;charset=utf-8';
  }

  return options;
}

export async function get(url) {
  return request(url, createOptions());
}

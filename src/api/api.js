

async function request(urlQuery, options) {
  try {
    const response = await fetch(`/api/${urlQuery}`, options); //?rateurl=$

    if (response.ok != true) {
      const error = await response.json();
      throw new Error(error.message);
    }

    if (response.status == 204) {
      return response;
    } else {
      return response.text();//.json();
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

export async function get(urlQuery) {
  return request(urlQuery, createOptions());
}

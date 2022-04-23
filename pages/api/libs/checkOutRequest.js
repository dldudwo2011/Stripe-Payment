/* 
    checkOutRequest
    parameters: 
    uid: product uniqe id, links the product in the UI to the item in the RealTime Database. We only send the uid
    Process:
    We need to create a POST request. Most often your making GET requests where you are asking for data. 
    You use the POST HTTP verb whenver you want to send information out to the server/cloud function. Examples
    of this might be email form, adding a new user, writing a blog post.
    Fetch() API Setting Up A POST REQUEST
    fetch( url, object)
    url: path to the function that will process the request  cloud function/server (endpoint)
    obj: An object containing any custom settings that you want to apply to the request.
       
        method: The request method, e.g., GET, POST  (GET method is default when you do not include the second parameter)
       
        headers: Headers are name value pairs that you send along in an HTTP message.  They are instructions that the server processing the request can use.    https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers
       
        body: this is the data you want to send along in the message it can be a Blob/BufferSource(binary data), FormData, URLSearchParams.
*/

async function checkOutRequest(key) {
  const data = JSON.stringify({ key });
  const checkoutSession = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: data,
  });

  return null;
}

export { checkOutRequest };

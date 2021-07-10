const heartBeat = () => {
  setInterval(() => {
    console.log("hello");
  }, 5000);
};

const postData = (url, data) => {
  fetch(url, {
    method: "POST",
    body: data,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("Success:", result);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
};

module.export = { heartBeat, postData };

export const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(() => {
      reject(new Error("Requet took too long"));
    }, sec * 1000);
  });
};

export const getJSON = async function (url) {
  const res = await fetch(url);
  const data = await res.json();
  if (!res.ok) throw new Error(`(${data.code}) ${data.messages}`);
  return data;
};

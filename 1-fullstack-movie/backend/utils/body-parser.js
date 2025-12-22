// Node.js isteği body bölümündeki içeriğe doğrudan tek seferde erişimize.
// İstek - yanıt sürecinin hızlanması için client'ın gönderdiği body parça parça (chunk) gönderilir.
// Bu fonksiyon içerisinde isteğin body parçalarını alıp birleşiricez

const bodyParser = (req) => {
  return new Promise((resolve, reject) => {
    try {
      // client'dan gelen veriyi tuttuğumuz değişken
      let body = "";

      // client'tan her body parçası (chunk) geldiğinde elimizdeki body değişkenine ekle
      req.on("data", (chunk) => {
        // body'nin devamına gelen chunk'ı ekle
        body += chunk;
      });

      // aktarma işlemi bittiğinde json versini js'e çevir
      req.on("end", () => {
        resolve(JSON.parse(body));
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = bodyParser;

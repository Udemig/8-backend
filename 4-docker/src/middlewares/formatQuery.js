import qs from "qs";

const formatQuery = (req, res, next) => {
  //* client'dan gelen parametreler:    { 'rating[gt]': '4', 'price[lte]': '500' }
  //* mongodb'nin istediği format:      { rating:{ $gt: 4 },  price: { $lte: 500 } }

  console.log("formatQuery", req.query);

  // 1) urldeki arama parametrelerine eriş
  const queryObj = qs.parse(req.query);

  // 2) filtreleme nesnesinden (sort,fields,page,limit) alanlarını kaldır
  const fields = ["sort", "limit", "page", "fields"];
  fields.forEach((el) => delete queryObj[el]);

  // 3) string methodlarını kullanaiblmek için parametler nesnesini stringe çevir
  let queryStr = JSON.stringify(queryObj);

  // 4) bütün operatörlerin başına $ işareti koy
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|ne)\b/g, (found) => `$${found}`);

  // 5) string formatındaki parametleri nesne formatına çevir
  const parsedQuery = JSON.parse(queryStr);

  // 6) işlenmiş parametreleri request nesnesi içerisine ekle
  req.formattedQuery = parsedQuery;

  // 7) sonraki fonksiyonun çalışmasına izin ver
  next();
};

export default formatQuery;

// Sıralama, filtreleme, alan limitleme, sayfalama gibi özelliklerine projede defalarca ihtiyaç duyduğumuzdan dolayı her gerekti*ğinde bu özellikleri en baştan yazmamak için yeniden kullanılabilir bir sınıf içerisinde tanımlayalım

class APIFeatures {
  constructor(query, params, formattedParams) {
    this.query = query; // veritabanı sorgusu
    this.params = params; // api isteğinden gelen parametreler
    this.formattedParams = formattedParams; // mw'den gelen formatlanmış parametreler
  }

  filter() {
    this.query = this.query.find(this.formattedParams);

    return this;
  }

  sort() {
    if (this.params.sort) {
      this.query.sort(this.params.sort.replaceAll(",", " "));
    }

    return this;
  }

  select() {
    if (this.params.fields) {
      this.query.select(this.params.fields.replaceAll(",", " "));
    }

    return this;
  }

  pagination() {
    const page = Number(this.params.page) || 1;
    const limitCount = Number(this.params.limit) || 10;
    const skipCount = (page - 1) * limitCount;

    this.query.skip(skipCount).limit(limitCount);

    return this;
  }
}

export default APIFeatures;

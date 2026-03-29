import APIFeatures from "./apiFeatures.js";
import catchAsync from "./catchAsync.js";
import { NotFound } from "./errors.js";

// Örn: Bir belgeyi silme işlemi proje içerisinde sadece model ismi değişerek defalarca ayrı ayrı yazılıp kod tekrarına sebep oluyor. Bu sorunu önlemek için hangi Model üzerinde işlem yapılacağını parametre olarak alan bir fonkisyon yazıp kod tekrarını önleyecez. (Factory Pattern)

// Delete
export const deleteOne = (Model) =>
  catchAsync(async (req, res) => {
    const found = await Model.findByIdAndDelete(req.params.id);

    if (!found) throw new NotFound();

    res.status(204).json({ message: "İşlem başarılı" });
  });

// Update
export const updateOne = (Model) =>
  catchAsync(async (req, res) => {
    const found = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!found) throw new NotFound();

    res.status(200).json({ message: "Belge güncellendi", data: found });
  });

// Create
export const createOne = (Model) =>
  catchAsync(async (req, res) => {
    const newDocument = await Model.create(req.body);

    res.status(201).json({
      message: "Belge başarıyla oluşturuldu",
      data: newDocument,
    });
  });

// Get One
export const getOne = (Model, populateOptions) =>
  catchAsync(async (req, res) => {
    // İd'sine göre belgeyi arayan sorguyu oluştur
    let query = Model.findById(req.params.id);

    // Eğer populate ayarları geldiyse populate'i sorguya dahil et
    if (populateOptions) {
      query = query.populate(populateOptions);
    }

    // Ayarladığımız sorguyu çalıştır
    const document = await query;

    // Belge bulunamadıysa hata döndür
    if (!document) throw new NotFound();

    // Client'a cevap gönder
    res.status(200).json({ message: "Aradığınız belge bulundu", data: document });
  });

// Get All
export const getAll = (Model) =>
  catchAsync(async (req, res) => {
    // sorgular için kullanıcağımız filtreleme sıralama vb desteklere sahip sınıfı kullanalım
    const features = new APIFeatures(Model.find(), req.query, req.formattedQuery).filter().sort().select().pagination();

    // sorguyu çalıştır
    const docs = await features.query;

    // client'a yanıt gönder
    res.status(200).json({ message: "Veriler listendi", results: docs.length, data: docs });
  });

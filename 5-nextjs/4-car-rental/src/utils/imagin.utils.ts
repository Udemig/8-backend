type ImaginCarInput = {
  make: string;
  modelName: string;
  year: number;
};

export function buildCarImageUrl(car: ImaginCarInput): string {
  const params = new URLSearchParams({
    customer: "hrjavascript-mastery",
    make: car.make.toLowerCase(),
    modelFamily: car.modelName.toLowerCase().split(" ")[0],
    modelYear: String(car.year),
    angle: "23",
    zoomType: "fullscreen",
  });
  return `https://cdn.imagin.studio/getImage?${params.toString()}`;
}

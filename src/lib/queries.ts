export const CARS_QUERY = `*[_type == "car" && defined(slug.current) && !defined($model) || model->name match $model] | order(_createdAt desc) {
  _id,
  price,
    features,
    name,
    imgUrl,
    available,
    slug,
    brand -> {
    name
    },
    model ->{
      name
    }
}`;

export const MODELS_QUERY = `*[_type == "model"] | order(_createdAt desc) {
  _id,
  name,
}`;

export const CAR_BY_ID = `*[_type == "car" && _id == $id][0] {
  _id,
  price,
    features,
    name,
    imgUrl,
    available,
    slug,
    brand -> {
    name
    },
    model ->{
      name
    }
}`;

export const CONTACT_BY_ID = `*[_type == "contact" && _id == $id][0] {
  _id,
  name,
    email,
    phone,
    car,
    startDate,
    endDate,
    priceTotal
}`;

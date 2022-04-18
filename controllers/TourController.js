const cloudinary = require("cloudinary").v2;
const {
  addTour,
  getAllTours,
  findTourModel,
} = require("../services/TourService");
const Tour = require("../models/Tour");
const fs = require("fs");

cloudinary.config({
  cloud_name: "dmorxcs1y",
  api_key: "872881161811572",
  api_secret: "kDnGezb0yopoQZ3SAyWObnQjBIA",
});

async function findTour(req, res) {
  try {
    //const { id } = req.user;
    //const TourRequest = await findTourModel("clave", "valor");
    res.status(201).send({ message: "found tour", value: TourRequest });
  } catch (err) {
    res.status(400).send({
      message: `tour not found. ${err}`,
    });
  }
}

async function registerTour(req, res) {
  //console.log(req.body);
  try {
    const { files } = req;
    const { user } = req;
    let arrayImg = [];
    if (files) {
      arrayImg = await pushImages(files);
      console.log(arrayImg);
    }

    const { itinerary, ...data } = req.body;
    console.log(data);
    const tours = {
      ...data,
      idUser: user._id,
      images: arrayImg,
      itinerary: JSON.parse(itinerary),
    };
    console.log(tours);
    const tourRequest = await addTour(tours);
    console.log(tourRequest);

    res
      .status(201)
      .send({ message: "successfully created tour", value: tourRequest });
  } catch (err) {
    res.status(400).send({
      message: `failed operation. ${err}`,
    });
  }
}

const pushImages = async (files) => {
  const arrayImages = new Array();
  for (const el of files) {
    try {
      const { url } = await cloudinary.uploader.upload(el.path);
      arrayImages.push(url);
    } catch (err) {
      console.log(err);
    } finally {
      fs.unlinkSync(el.path);
    }
  }
  return arrayImages;
};

async function getTours(req, res) {
  const tour = await getAllTours();
  res.status(200).send({ value: tour });
}

async function updateTour(req, res) {
  try {
    const { files } = req;
    const arrayImg = await pushImages(files);

    const body = req.body;

    const tour = Object.create(Tour);
    tour.title = body.title;
    tour.idUser = body.idUser;
    tour.description = body.description;
    tour.destination = body.destination;
    tour.categori = body.categori;
    tour.price = body.price;
    tour.nDays = body.nDays;
    tour.startDate = body.startDate;
    tour.endDate = body.endDate;
    tour.images = arrayImg;
    tour.itinerary = JSON.parse(body.itinerary);

    const tourRequest = await findByIdAndUpdate(body._id, tour, { new: true });

    res
      .status(201)
      .send({ message: "successfully update tour", value: tourRequest });
  } catch (err) {
    res.status(400).send({
      message: `failed operation. ${err}`,
    });
  }
}

module.exports = {
  registerTour,
  getTours,
  findTour,
  updateTour,
};

import Product from "../models/products";
import Serial from "../models/serial";

export async function getDrug(req, res) {
  const { serial } = req.params;
  console.log(serial);
  if (!serial) {
    return res.status(400).send({});
  }
  const serialProduct = await Serial.findOne({ serial });
  if (!serialProduct) {
    return res.status(404).send({});
  }
  const product = await Product.findById(serialProduct.product);
  console.log(product);
  if (!product) {
    return res.status(404).send({});
  }

  res.send(product);
}

export async function getDrugs(req, res) {
  const { serials } = req.body

  if(!Array.isArray(serials)) {
    return res.status(400).send({})
  }

  const serialsProduct = await Serial.find({
    serial: {
      $in: [
        ...serials  
      ]
    }
  })

  const serialNumbers = serialsProduct.map((value) => {
    return value.product
  })
  const products = await Product.find({
    _id: {
      $in: [
        ...serialNumbers
      ]
    }
  })

  res.send(products)


}

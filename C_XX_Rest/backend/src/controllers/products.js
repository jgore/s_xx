import Product from "../models/products";

export async function getDrug(req, res) {
  if (!req.params.id) {
    return res.status(400).send({});
  }
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).send({});
  }
  res.send(product);
}

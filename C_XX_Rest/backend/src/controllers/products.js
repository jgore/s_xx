import Product from "../models/products";

export async function verfiyDrug(req, res) {
  const { serials } = req.body;
  if (!Array.isArray(serials)) {
    return res.status(400).send({});
  }

  const products = await Product.aggregate([
    {
      $limit: 1
    },
    {
      $project: {
        _id: 0,
        serialsToSearch: serials
      }
    },
    {
      $unwind: "$serialsToSearch"
    },
    {
      $lookup: {
        from: "products", //very important, name of collection where we are looking for
        let: {
          serial: "$serialsToSearch"
        },
        pipeline: [
          {
            $match: {
              $expr: {
                $in: ["$$serial", "$serials"]
              }
            }
          }
        ],
        as: "searialsLookup"
      }
    },
    {
      $unwind: {
        path: "$searialsLookup",
        preserveNullAndEmptyArrays: true
      }
    },
    {
      $project: {
        serial: "$serialsToSearch",
        doc: {
          $ifNull: ["$searialsLookup", null]
        }
      }
    }
  ]);
  res.send(products);
}

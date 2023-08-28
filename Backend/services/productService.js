const Category = require("../Model/categoryModel");
const Product = require("../Model/productModel");

//     Creating Product
exports.createProduct = async (reqData) => {
  try {
    let topLevel = await Category.findOne({ name: reqData.topLevel });
    if (!topLevel) {
      topLevel = new Category({
        name: reqData.topLevel,
        level: 1,
      });
    }

    let secondLevel = await Category.findOne({
      name: reqData.secondLevel,
      parentCategory: topLevel._id,
    });

    if (!secondLevel) {
      secondLevel = new Category({
        name: reqData.secondLevel,
        parentCategory: topLevel._id,
        level: 2,
      });
    }

    let thirdLevel = await Category.findOne({
      name: reqData.thirdLevel,
      parentCategory: secondLevel._id,
    });
    if (!thirdLevel) {
      thirdLevel = new Category({
        name: reqData.thirdLevel,
        parentCategory: secondLevel._id,
        level: 3,
      });
    }

    const product = new Product({
      title: reqData.title,
      description: reqData.description,
      price: reqData.price,
      discountPrice: reqData.discountPrice,
      discountPercentage: reqData.discountPercentage,
      sizes: reqData.sizes,
      brand: reqData.brand,
      color: reqData.color,
      imageUrl: reqData.imageUrl,
      category: thirdLevel._id,
    });

    return await product.save();
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.deleteProduct = async (productId) => {
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new Error("Product not found");
  }
};

exports.updateProduct = async (productId, reqData) => {
  try {
    const product = await Product.findByIdAndUpdate(productId, reqData, {
      new: true,
    });

    return product;
  } catch (err) {
    throw new Error(err.message);
  }
};

exports.getAllProducts = async (reqQuery) => {
  const {
    category,
    color,
    sizes,
    minPrice,
    maxPrice,
    minDiscount,
    maxDiscount,
    sort,
    stock,
    pageNumber,
    pageSize,
  } = reqQuery;

  // Limiting how many product show on each page
  pageSize = pageSize || 10;

  let query = Product.find().populate("category");
  //               FOR CATEGORY
  if (category) {
    const existCategories = await Category.findOne({ name: category });

    if (existCategories) {
      query.where("category").equals(existCategories._id);
    } else {
      return { content: [], currentPage: 1, totalPages: 0 };
    }
  }

  // Color
  if (color) {
    //  making unique array
    const colorSet = new Set(
      color.split(",").map((color) => color.trim().toLowerCase())
    );

    // if any color matches with product color then match and return product
    const colorRegex =
      //    RegExp convert into regular expression
      colorSet.size > 0 ? new RegExp([...colorSet].join("|"), "i") : null;

    //  updating query
    //  applies the regular expression we created earlier to the "color" field,
    query = query.where("color").regex(colorRegex);
  }
  // Now for size
  if (sizes) {
    const sizeSet = new Set(sizes);
    //    Modify the query to include only items where the 'sizes.name' field matches any of the values in the sizeSet
    query = query.where("sizes.name").in([...sizeSet]);
  }

  //   minprice and maxPrice
  if (minPrice && maxPrice) {
    query = query.where("price").gte(minPrice).lte(maxPrice);
  }
  if (minPrice && !maxprice) {
    query = query.where("price").gte(minPrice);
  }
  if (maxPrice && !minprice) {
    query = query.where("price").lte(maxPrice);
  }

  //   For Discount
  if (minDiscount) {
    query = query.where("discountPrice").gte(minDiscount);
  }
  if (maxDiscount) {
    query = query.where("discountPrice").gte(maxDiscount);
  }

  //  For Stcok
  if (stock) {
    if (stock === "in_stock") {
      query = query.where("quantity").gt(0);
    } else if (stock === "out_of_stock") {
      query = query.where("quantity").lte(0);
    }
  }

  //  For Sorting
  if (sort) {
    if (sort === "price_high_to_low") {
      query = query.sort("-price");
    } else if (sort === "price_low_to_high") {
      query = query.sort("price");
    }
  }

  const totalProducts = await Product.countDocuments(query);

  // skip
  // on 1 page  0-10
  const skip = (pageNumber - 1) * pageSize;

  query = query.skip(skip).limit(pageSize);

  // Now executing query at last
  const products = await query.exec();

  const totalPages = Math.ceil(totalProducts / pageSize);

  return { content: products, currentPage: pageNumber, totalPages };
};

exports.findProductById = async (productId) => {
  const product = await Product.findById(productId);

  return product;
};

//     For Uploading Multiple Products  at start
exports.createMultipleProduct = async (products) => {
  for (product of products) {
    await createProduct(product);
  }
};

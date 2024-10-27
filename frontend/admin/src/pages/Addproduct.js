import { useFormik } from "formik";
import { React, useEffect } from "react";
import Dropzone from "react-dropzone";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import CustomInput from "../components/CustomInput";
import { getCategories } from "../features/pcategory/pcategorySlice";
import {
  createProducts,
  getAProduct,
  resetState,
  updateAProduct,
} from "../features/product/productSlice";
import { delImg, uploadImg } from "../features/upload/uploadSlice";

// Updated validation schema
let schema = yup.object().shape({
  title: yup.string().required("Title is Required"),
  description: yup.string().required("Description is Required"),
  price: yup.number().required("Price is Required"),
  category: yup.string().required("Category is Required"),
  tags: yup.string().required("Tag is Required"),
  stock: yup.number().required("Quantity is Required"),
  size: yup.string().required("Size is Required"),
  discountPercentage: yup.number(),
});

const AddProduct = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const getPId = location.pathname.split("/")[3];
  const navigate = useNavigate();
  // const [images, setImages] = useState([]);
  const catState = useSelector((state) => state.pCategory.pCategories);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);
  const {
    savedTitle,
    savedDescription,
    savedPrice,
    savedCategory,
    savedTags,
    savedStock,
    savedSize,
    savedDiscountPercentage,
    savedImages,
  } = newProduct;

  useEffect(() => {
    dispatch(getCategories());
  }, []);

  useEffect(() => {
    if (getPId !== undefined) {
      dispatch(getAProduct(getPId));
    } else {
      dispatch(resetState());
    }
  }, [dispatch, getPId]);

  useEffect(() => {
    // Sync uploaded images to formik values
    formik.setFieldValue(
      "images",
      imgState.map((i) => ({
        public_id: i.public_id,
        url: i.url,
      }))
    );
  }, [imgState]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: savedTitle || "",
      description: savedDescription || "",
      price: savedPrice || "",
      category: savedCategory || "",
      tags: savedTags || "",
      stock: savedStock || "",
      size: savedSize || "",
      images: savedImages || [],
      discountPercentage: savedDiscountPercentage || "",
    },
    validationSchema: schema,
    onSubmit: (values) => {
      if (getPId !== undefined) {
        const updateData = {
          id: getPId,
          pData: values,
        };
        dispatch(updateAProduct(updateData));
        dispatch(resetState());
        navigate("/admin/list-product");
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getPId !== undefined ? "Edit" : "Add"} Product
      </h3>
      <div>
        <form
          onSubmit={formik.handleSubmit}
          className="d-flex gap-3 flex-column"
        >
          {/* Product Title */}
          <CustomInput
            type="text"
            label="Enter Product Title"
            name="title"
            onChng={formik.handleChange("title")}
            onBlr={formik.handleBlur("title")}
            val={formik.values.title}
          />
          <div className="error">
            {formik.touched.title && formik.errors.title}
          </div>

          {/* Product Description */}
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange("description")}
              value={formik.values.description}
            />
          </div>
          <div className="error">
            {formik.touched.description && formik.errors.description}
          </div>

          {/* Product Price */}
          <CustomInput
            type="number"
            label="Enter Product Price"
            name="price"
            onChng={formik.handleChange("price")}
            onBlr={formik.handleBlur("price")}
            val={formik.values.price}
          />
          <div className="error">
            {formik.touched.price && formik.errors.price}
          </div>

          {/* Product Category */}
          <select
            name="category"
            onChange={formik.handleChange("category")}
            onBlur={formik.handleBlur("category")}
            value={formik.values.category}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="">Select Category</option>
            {catState.map((i, j) => (
              <option key={j} value={i.title}>
                {i.title}
              </option>
            ))}
          </select>
          <div className="error">
            {formik.touched.category && formik.errors.category}
          </div>

          {/* Product Tags */}
          <select
            name="tags"
            onChange={formik.handleChange("tags")}
            onBlur={formik.handleBlur("tags")}
            value={formik.values.tags}
            className="form-control py-3 mb-3"
            id=""
          >
            <option value="" disabled>
              Select Tag
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error">
            {formik.touched.tags && formik.errors.tags}
          </div>

          {/* Product Stock */}
          <CustomInput
            type="number"
            label="Enter Product Quantity"
            name="stock"
            onChng={formik.handleChange("stock")}
            onBlr={formik.handleBlur("stock")}
            val={formik.values.stock}
          />
          <div className="error">
            {formik.touched.stock && formik.errors.stock}
          </div>

          {/* Product Size */}
          <select
            name="size"
            onChange={formik.handleChange("size")}
            onBlur={formik.handleBlur("size")}
            value={formik.values.size}
            className="form-control py-3 mb-3"
          >
            <option value="">Select Size</option>
            <option value="4-pack">4-pack</option>
            <option value="8-pack">8-pack</option>
            <option value="0.5kg">0.5kg</option>
            <option value="1kg">1kg</option>
            <option value="2kg">2kg</option>
          </select>
          <div className="error">
            {formik.touched.size && formik.errors.size}
          </div>

          {/* Discount Percentage */}
          <CustomInput
            type="number"
            label="Enter Discount Percentage"
            name="discountPercentage"
            onChng={formik.handleChange("discountPercentage")}
            onBlr={formik.handleBlur("discountPercentage")}
            val={formik.values.discountPercentage}
          />
          <div className="error">
            {formik.touched.discountPercentage &&
              formik.errors.discountPercentage}
          </div>

          {/* Image Upload Section */}
          <div className="bg-white cursor-pointer border-1 p-5 text-center">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {formik.values.images.map((i, j) => {
              return (
                <div className=" position-relative" key={j}>
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(i.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: "10px", right: "10px" }}
                  ></button>
                  <img src={i.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
          >
            {getPId !== undefined ? "Update" : "Add"} Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;

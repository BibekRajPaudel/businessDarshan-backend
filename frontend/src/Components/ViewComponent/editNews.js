import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useDropzone } from "react-dropzone";
import {
  FormInput,
  FormTextAreaField,
  SmallFormTextAreaField,
} from "../input/FormInput";
import { useFormik, Field, ErrorMessage } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

const EditNews = ({item}) => {
  const [selectedFile, setSelectedFile] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('None');
  const [tag, setTag] = useState('None');


  const router = useNavigate();

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleTagChange = (event) => {
    setTag(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      title: item.title || "",
      description: item.description || "",
      author: item.author || "",
      subDescription: item.subDescription || "",
      category: item.category || "",
      image: item.image || "",
      tag: item.tag || "",
    },

    onSubmit: async (
      { title, description, author, subDescription, category, image, tag },
      actions
    ) => {
      setLoading(true);
      const formData = new FormData();
      for (let i = 0; i < image.length; i++) {
        formData.append("image", image[i]);
      }
      formData.append("title", title);
      formData.append("description", description);
      formData.append("author", author);
      formData.append("subDescription", subDescription);
      formData.append("category", category);
      formData.append("tag", tag);

      await axios.put(`${process.env.REACT_APP_URL}/updatenews/${item._id}`, formData);
      actions.resetForm();
      setSelectedFile([]);
      router("/dashboard");
    },
  });

  const onfileChange = () => {
    formik.setFieldValue("image", selectedFile);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/*": [".jpg", ".jpeg", ".png"],
    },
    onDrop: (acceptedFiles) => {
      setSelectedFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
      formik.setFieldValue("image", acceptedFiles);
    },
  });

  const selectedImages = selectedFile?.map((file, i) => (
    <div key={i}>
      <img
        className="rounded-[8px] w-[200px] h-[200px]"
        src={file.preview}
        alt=""
      />
    </div>
  ));

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="grid grid-cols-2 gap-5 px-4">
        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">शीर्षक</h1>
          <FormInput
            name="title"
            formik={formik}
            //placeholder="शीर्षक..."
            type="text"
          />
        </div>

        <div className="w-full">
          <h1 className="text-[16px] font-[700] mb-3">लेखक</h1>
          <FormInput
            name="author"
            formik={formik}
            //placeholder="Enter Author..."
            type="text"
          />
        </div>
        <div className="w-full">
          <div className="w-full grid grid-cols-1 gap-3">
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="tag"
                className="text-[16px] font-[700] mb-3"
              >
                ट्याग
              </label>
              <select
                 className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                 id="tag"
                 name="tag"
                 value={tag}
                 onChange={(e) => [formik.setFieldValue("tag",e.target.value),
                setTag(e.target.value)]}
              >
                <option className="text-gray-400" value="None">
                  -- एक विकल्प छान्नुहोस् --
                </option>
                <option value="news">अर्थ / समाचार</option>
                <option value="bank-market">बैंक / बजार</option>
                <option value="philosophy">दर्शन संवाद</option>
                <option value="startup">स्टार्टअप</option>
                <option value="additional">थप</option>
              </select>
            </div>
          </div>
        </div>

        <div className="w-full">
          <div className="w-full grid grid-cols-1 gap-3">
            <div className="w-full flex flex-col gap-2">
              <label
                htmlFor="category"
                className="text-[16px] font-[700] mb-3"
              >
                श्रेणी
              </label>
              <select
                className="w-full p-3 rounded-md outline-primary-blue font-poppins text-xs border-[1px]"
                id="category"
                name="category"
                value={category}
                onChange={(e) =>[ formik.setFieldValue("category",e.target.value),
                setCategory(e.target.value)]}
              >
                <option className="text-gray-400" value="None">
                  -- एक विकल्प छान्नुहोस् --
                </option>
                <option value="business">व्यापार</option>
                <option value="infrastructure">पूर्वाधार</option>
                <option value="investment">लगानी</option>
                <option value="development">विकास</option>
                <option value="industry">उद्योग</option>
                <option value="agriculture">कृषि</option>
                <option value="banking">बैंकिङ्ग</option>
                <option value="insurance">बीमा</option>
                <option value="sharemarket">सेयर बजार</option>
                <option value="auto">अटो</option>
                <option value="gold/silver">सुनचाँदी</option>
                <option value="fuel">इन्धन</option>
                <option value="interview">अन्तरर्वाता</option>
                <option value="report">रिपोर्ट</option>
                <option value="Analysis">विश्लेषण</option>
                <option value="blog">ब्लक</option>
                <option value="Hotel">होटल</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">उपविवरण</h1>
        <SmallFormTextAreaField
          name="short-overview"
          formik={formik}
          type="text"
        />
      </div>

      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">विवरण</h1>
        <FormTextAreaField name="overview" formik={formik} type="text" />
      </div>

      <div className="w-full mt-5 px-4">
        <h1 className="text-[16px] font-[700] mb-3">छविहरू</h1>
        <div
          {...getRootProps()}
          className="flex justify-center items-center bg-[#FAFAFA] w-full border-[1px] border-dashed border-[#686868] h-[215px] rounded-[8px] cursor-pointer"
        >
          <input
            name="image"
            {...getInputProps()}
            onChange={onfileChange}
            type="file"
          />
          <label
            className="bg-[#FFFFFF] p-[10px] rounded-[8px] shadow-allShadow"
            htmlFor="file-input"
          >
            {isDragActive ? (
              <p>फाइलहरू यहाँ छोड्नुहोस् ...</p>
            ) : (
              <p>अपलोड गर्न फाइलहरू यहाँ छोड्नुहोस्</p>
            )}
          </label>
        </div>
        <div className="text-[red]">
          {formik.touched["image"] && formik.errors["image"]
            ? formik.errors["image"]
            : null}
        </div>
      </div>
      <div className="flex flex-wrap justify-around mt-5 gap-5">
        {selectedImages}
      </div>
      <div className="flex justify-end py-5 px-4">
        <button
          className="bg-[#2266D1] px-5 py-2 rounded-md text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex gap-2 items-center">
              <ClipLoader color="#36d7b7" size={20} />
              <p className="opacity-[0.7]">पेश गर्नुहोस्</p>
            </div>
          ) : (
            "पेश गर्नुहोस्"
          )}
        </button>
      </div>
    </form>
  );
};

export default EditNews;

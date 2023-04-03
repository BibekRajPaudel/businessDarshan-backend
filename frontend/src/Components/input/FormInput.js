export const FormInput = ({ name, formik, placeholder, type }) => {
  return (
    <div>
      <input
        type={type}
        className={`px-[10px] py-1 w-full h-[45px] border-[1px] rounded-[8px] 
          ${
            formik.touched[name] && formik.errors[name]
              ? "border-[red]"
              : "border-[#686868]"
          }`}
        name={name}
        id={name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
        placeholder={placeholder}
      />
      <div className="text-[red]">
        {formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : null}
      </div>
    </div>
  );
};

export const FormImageInput = ({ name, formik, type }) => {
  return (
    <div>
      <input
        type={type}
        className={`
          ${
            formik.touched[name] && formik.errors[name]
              ? "border-[red]"
              : "border-[#686868]"
          }`}
        name={name}
        id={name}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      <div className="text-[red]">
        {formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : null}
      </div>
    </div>
  );
};

export const FormTextAreaField = ({ name, formik }) => {
  return (
    <div>
      <textarea
        type="text"
        className={`p-[10px] w-full h-full border-[1px] border-[#686868] rounded-[8px] ${
          formik.touched[name] && formik.errors[name] ? "is-invalid" : ""
        }`}
        name={name}
        id={name}
        rows="10"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      <div className="text-[red]">
        {formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : null}
      </div>
    </div>
  );
};

export const SmallFormTextAreaField = ({ name, formik }) => {
  return (
    <div>
      <textarea
        type="text"
        className={`p-[10px] w-full h-full border-[1px] border-[#686868] rounded-[8px] ${
          formik.touched[name] && formik.errors[name] ? "is-invalid" : ""
        }`}
        name={name}
        id={name}
        rows="1"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values[name]}
      />
      <div className="text-[red]">
        {formik.touched[name] && formik.errors[name]
          ? formik.errors[name]
          : null}
      </div>
    </div>
  );
};




import React from "react";
import Select from "react-select";

// const sltOption = [
//   { value: "All", label: "All" },
//   { value: "AIS HR", label: "AIS HR" },
//   { value: "AIS Sales", label: "AIS Sales" },
//   { value: "Alliance Delivery", label: "Alliance Delivery" },
//   { value: "Alliance Franchise", label: "Alliance Franchise" },
//   { value: "Alliance HR", label: "Alliance HR" },
//   { value: "Alliance Operations", label: "Alliance Operations" },
//   { value: "Alliance Sales", label: "Alliance Sales" },
//   { value: "BA", label: "BA" },
//   { value: "Design", label: "Design" },
//   { value: "HTML", label: "HTML" },
//   { value: "Laravel", label: "Laravel" },
//   { value: "Mobile", label: "Mobile" },
//   { value: "Node", label: "Node" },
//   { value: "PM", label: "PM" },
//   { value: "QA", label: "QA" },
//   { value: "React JS", label: "React JS" },
//   { value: "React Native", label: "React Native" },
//   { value: "Seo", label: "Seo" },
//   { value: "Unity", label: "Unity" },
//   { value: "Wordpress", label: "Wordpress" },

// ];

function SelectShow(props) {
  const { getShowTo, handleChangeSelectShow, sltOption, isRequired } = props;

  // const handleChange = (getShowTo) => {
  //   setGetShowTo(getShowTo || []);
  // };

  return (
    <Select
      menuPortalTarget={document.body}
      styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
      options={
        !getShowTo?.length
          ? sltOption
          : getShowTo.find((cv) => cv.value === "All")?.value === "All"
          ? sltOption.toSpliced(1, sltOption?.length - 1)
          : sltOption.toSpliced(0, 1)
      }
      onChange={handleChangeSelectShow}
      value={getShowTo}
      isMulti
      required={!!isRequired}
    />
  );
}

export default SelectShow;

export const isDisabledValue = (isViewMode, name,des) => {
    if (isViewMode === "prf") {
      return name;
    } else {
      return isViewMode;
    }
  };
  
  const getValue = (isViewMode, name, value) => {
    if (isViewMode === "prf") {
      return name ? name : value;
    } else {
      if (isViewMode) {
        return name;
      } else {
        return value;
      }
    }
  };
  export default getValue;
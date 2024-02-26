export const handleViewerOpen = (viewParam) => () => {
    const result = "?" + new URLSearchParams(viewParam).toString();

    window.open(`/view-knowledge${result}`);
  };


   
// #toolbar=0   // this is uses for hidden download button in window opne
  

const openInNewTab = (url) => {
    const newWindow = window.open(`${url}#toolbar=0`, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  const fetchImage = async (imageUrl,setIsLoading) => {
    setIsLoading(true);
    const res = await fetch(imageUrl,
    //    {
    //   headers: {
    //     Authorization: `token ${getCookiesToken()}`,
    //   },
    // }

    );

   
    

    const imageBlob = await res.blob();
    const imageObjectURL = URL.createObjectURL(imageBlob);
    setIsLoading(false);
    openInNewTab(imageObjectURL);
  };

  export default fetchImage;
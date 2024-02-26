import { getCookiesToken } from "../../helpers/cookies";

const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
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


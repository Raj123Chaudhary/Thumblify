import { useSearchParams } from "react-router-dom";
import { yt_html } from "../assets/assets";

const YtPreview = () => {
  const [searchParams] = useSearchParams();
  const thumnail_url = searchParams.get("thumnail_url");
  const title = searchParams.get("title");
  const new_html = yt_html
    .replace("%%THUMNAIL_URL55", thumnail_url!)
    .replace("%%TITLE%%", title!);

  //   const thumnail_url = searchParams.get("thumnail_url");

  return (
    <div className="fixed inset-0 bg-black">
      <iframe
        srcDoc={new_html}
        width="100%"
        height={"100%"}
        allowFullScreen
      ></iframe>
    </div>
  );
};
export default YtPreview;

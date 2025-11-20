import { useEffect } from "react";
import oldAppCssUrl from "./old-app.entry.css?url"; // ← built asset URL

export default function OldAppStyles() {
  useEffect(() => {
    // add the stylesheet
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = oldAppCssUrl;
    link.dataset.oldAppStyles = "true";
    document.head.appendChild(link);

    // clean it up when layout unmounts
    return () => {
      if (link.parentNode) link.parentNode.removeChild(link);
    };
  }, []);

  return null;
}

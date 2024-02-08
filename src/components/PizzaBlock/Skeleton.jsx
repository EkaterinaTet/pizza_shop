import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = (props) => (
  <ContentLoader
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="456" y="41" rx="3" ry="3" width="52" height="6" />
    <circle cx="132" cy="123" r="101" />
    <rect x="3" y="244" rx="0" ry="0" width="280" height="34" />
    <rect x="4" y="299" rx="26" ry="26" width="280" height="88" />
    <rect x="27" y="409" rx="0" ry="0" width="80" height="27" />
    <rect x="154" y="403" rx="34" ry="34" width="124" height="40" />
  </ContentLoader>
);

export default Skeleton;

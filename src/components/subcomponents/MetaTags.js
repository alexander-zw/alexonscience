import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";

export default function MetaTags(props) {
    const defaultTitle = "ALEX on Science";
    const title = props.title ? `${props.title} | ${defaultTitle}` : defaultTitle;
    const description = props.description
        ? props.description
        : "The official ALEX on Science website";
    const defaultKeywords = "alex, alexander, wu, science, youtube";
    const keywords = props.keywords ? `${props.keywords}, ${defaultKeywords}` : defaultKeywords;
    const defaultURL = "https://alexonscience.com";
    const url = props.url ? `${defaultURL}${props.url}` : defaultURL;

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content="Alexander Wu" />
            <link rel="canonical" href={url} />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

            <meta property="og:title" content={title} />
            <meta property="og:image" content="%PUBLIC_URL%/preview.jpg" />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={description} />
        </Helmet>
    );
}

MetaTags.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    keywords: PropTypes.string,
    url: PropTypes.string,
};

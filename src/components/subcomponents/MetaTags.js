/**
 * This subcomponent adds meta tags to a view, fetching data from AllViews.js.
 */
import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { allViews, getTitle, getURL } from "./AllViews";

export default function MetaTags(props) {
    const view = allViews.get(props.path);
    const title = getTitle(view);
    const url = getURL(props.path);

    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={view.description} />
            <meta name="keywords" content={view.keywords} />
            <meta name="author" content="Alexander Wu" />
            <link rel="canonical" href={url} />
            <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />

            <meta property="og:title" content={title} />
            <meta property="og:image" content="%PUBLIC_URL%/preview.jpg" />
            <meta property="og:url" content={url} />
            <meta property="og:description" content={view.description} />
        </Helmet>
    );
}

MetaTags.propTypes = {
    path: PropTypes.string.isRequired,
};
